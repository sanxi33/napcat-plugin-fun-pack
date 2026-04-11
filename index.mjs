import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

var EventType = ((EventType2) => {
  EventType2.MESSAGE = 'message';
  return EventType2;
})(EventType || {});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_CONFIG = {
  enabled: true,
  commandPrefix: '球鳖',
  assetsRoot: './assets',
  chooseEnabled: true,
  foodEnabled: true,
  drinkEnabled: true,
  longEnabled: true,
  d20Enabled: true,
  rollEnabled: true,
  trueFalseEnabled: true,
  offWorkEnabled: true
};

export let plugin_config_ui = [];
let logger = null;
let currentConfig = { ...DEFAULT_CONFIG };
let ctxRef = null;

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function sanitizeConfig(raw) {
  if (!isObject(raw)) return { ...DEFAULT_CONFIG };
  const out = { ...DEFAULT_CONFIG, ...raw };
  out.enabled = Boolean(out.enabled);
  out.chooseEnabled = Boolean(out.chooseEnabled);
  out.foodEnabled = Boolean(out.foodEnabled);
  out.drinkEnabled = Boolean(out.drinkEnabled);
  out.longEnabled = Boolean(out.longEnabled);
  out.d20Enabled = Boolean(out.d20Enabled);
  out.rollEnabled = Boolean(out.rollEnabled);
  out.trueFalseEnabled = Boolean(out.trueFalseEnabled);
  out.offWorkEnabled = Boolean(out.offWorkEnabled);
  out.commandPrefix = String(out.commandPrefix || '球鳖').trim();
  out.assetsRoot = String(out.assetsRoot || DEFAULT_CONFIG.assetsRoot).trim();
  return out;
}

function resolveAssetsRoot() {
  if (path.isAbsolute(currentConfig.assetsRoot)) return currentConfig.assetsRoot;
  return path.resolve(__dirname, currentConfig.assetsRoot || DEFAULT_CONFIG.assetsRoot);
}

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function pickRandomFile(dirPath, extensions) {
  try {
    if (!fs.existsSync(dirPath)) return null;
    const files = fs.readdirSync(dirPath)
      .map((name) => path.join(dirPath, name))
      .filter((itemPath) => fs.statSync(itemPath).isFile() && extensions.includes(path.extname(itemPath).toLowerCase()));
    if (!files.length) return null;
    const idx = Math.floor(Math.random() * files.length);
    return files[idx];
  } catch {
    return null;
  }
}

function toCQImage(localPath) {
  const normalized = normalizePath(localPath);
  return `[CQ:image,file=file:///${encodeURI(normalized)}]`;
}

async function sendMsg(ctx, event, message) {
  const params = {
    message,
    message_type: event.message_type,
    ...(event.message_type === 'group' && event.group_id ? { group_id: String(event.group_id) } : {}),
    ...(event.message_type === 'private' && event.user_id ? { user_id: String(event.user_id) } : {})
  };
  await ctx.actions.call('send_msg', params, ctx.adapterName, ctx.pluginManager.config);
}

function stripPrefix(text) {
  const trimmed = String(text || '').trim();
  if (!currentConfig.commandPrefix) return trimmed;
  if (trimmed.startsWith(currentConfig.commandPrefix)) {
    return trimmed.slice(currentConfig.commandPrefix.length).trim();
  }
  return trimmed;
}

function normalizeCommand(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/[！!。,.，？?；;：:“”"'`~·]/g, '')
    .replace(/\s+/g, '');
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function handleChoose(rawText) {
  if (!currentConfig.chooseEnabled) return null;
  const norm = normalizeCommand(rawText);
  if (!(norm.includes('还是') && (norm.includes('要') || norm.includes('选')))) return null;

  const source = rawText.replace(/[？?。！!]/g, '');
  const tmp = source.includes('要') ? (source.split('要')[1] || '') : source;
  const options = tmp.split('还是').map((value) => value.trim()).filter(Boolean);
  if (options.length < 2) return '你先给我两个选项再纠结。';

  const picked = options[Math.floor(Math.random() * options.length)];
  return `建议你选：${picked}`;
}

function handleD20(text) {
  if (!currentConfig.d20Enabled) return null;
  const norm = normalizeCommand(text);
  const d20Keywords = ['d20', '.d20', '骰子', '投骰子', '掷骰子', '来个d20', 'rolld20', 'roll20'];
  if (!d20Keywords.includes(norm)) return null;
  const num = Math.floor(Math.random() * 20) + 1;
  if (num === 20) return '.d20=20 大成功！';
  if (num === 1) return '.d20=1 大失败！';
  return `.d20=${num}`;
}

function handleRoll(text) {
  if (!currentConfig.rollEnabled) return null;
  const norm = normalizeCommand(text);
  if (norm !== '/roll') return null;
  const num = Math.floor(Math.random() * 99) + 1;
  return `🎲 ${num}`;
}

function resolveFeature(text) {
  const root = resolveAssetsRoot();
  const norm = normalizeCommand(text);

  const foodKeywords = ['今天吃什么', '吃什么', '吃啥', '吃点啥', '吃点什么', '晚上吃什么', '中午吃什么', '早上吃什么', '今日吃什么'];
  if (currentConfig.foodEnabled && foodKeywords.includes(norm)) {
    const filePath = pickRandomFile(path.join(root, 'today_food', 'food_pic'), ['.png', '.jpg', '.jpeg', '.webp']);
    return filePath ? { type: 'image', value: filePath } : { type: 'text', value: '今天菜单丢了，晚点再试试~' };
  }

  const drinkKeywords = ['今天喝什么', '喝什么', '喝啥', '喝点啥', '喝点什么', '今日喝什么'];
  if (currentConfig.drinkEnabled && includesAny(norm, drinkKeywords)) {
    const filePath = pickRandomFile(path.join(root, 'today_food', 'drink'), ['.png', '.jpg', '.jpeg', '.webp']);
    return filePath ? { type: 'image', value: filePath } : { type: 'text', value: '今天饮品单不在工位上…' };
  }

  if (currentConfig.longEnabled && norm === '龙图') {
    const filePath = pickRandomFile(path.join(root, 'today_food', 'long'), ['.png', '.jpg', '.jpeg', '.webp']);
    return filePath ? { type: 'image', value: filePath } : { type: 'text', value: '龙图暂时没加载出来。' };
  }

  if (currentConfig.trueFalseEnabled && norm === '对吗') {
    const filePath = pickRandomFile(path.join(root, 'today_food', 't_o_f'), ['.png', '.jpg', '.jpeg', '.webp']);
    return filePath ? { type: 'image', value: filePath } : { type: 'text', value: '我现在也不太确定…' };
  }

  const offWorkRaw = String(text || '').trim();
  if (currentConfig.offWorkEnabled && (offWorkRaw === '下班' || offWorkRaw === '下班！')) {
    const filePath = path.join(root, 'today_food', 'jiaban.jpg');
    return fs.existsSync(filePath) ? { type: 'image', value: filePath } : { type: 'text', value: '先别下班，图不见了。' };
  }

  return null;
}

export const plugin_init = async (ctx) => {
  ctxRef = ctx;
  logger = ctx.logger;

  plugin_config_ui = ctx.NapCatConfig.combine(
    ctx.NapCatConfig.boolean('enabled', '启用插件', true, '总开关'),
    ctx.NapCatConfig.text('commandPrefix', '命令前缀', '球鳖', '例如：球鳖 今天吃什么；留空表示无前缀'),
    ctx.NapCatConfig.text('assetsRoot', '素材根目录', DEFAULT_CONFIG.assetsRoot, '默认使用仓库内的 ./assets'),
    ctx.NapCatConfig.boolean('chooseEnabled', '启用二选一', true, ''),
    ctx.NapCatConfig.boolean('foodEnabled', '启用今天吃什么', true, ''),
    ctx.NapCatConfig.boolean('drinkEnabled', '启用今天喝什么', true, ''),
    ctx.NapCatConfig.boolean('longEnabled', '启用龙图', true, ''),
    ctx.NapCatConfig.boolean('d20Enabled', '启用.d20', true, ''),
    ctx.NapCatConfig.boolean('rollEnabled', '启用/roll', true, ''),
    ctx.NapCatConfig.boolean('trueFalseEnabled', '启用对吗', true, ''),
    ctx.NapCatConfig.boolean('offWorkEnabled', '启用下班！', true, '')
  );

  try {
    if (fs.existsSync(ctx.configPath)) {
      const saved = JSON.parse(fs.readFileSync(ctx.configPath, 'utf-8'));
      currentConfig = sanitizeConfig(saved);
    }
  } catch (error) {
    logger?.warn('加载配置失败，使用默认配置', error);
    currentConfig = { ...DEFAULT_CONFIG };
  }

  logger?.info('fun-pack 已初始化');
};

export const plugin_onmessage = async (ctx, event) => {
  if (!currentConfig.enabled) return;
  if (event.post_type !== EventType.MESSAGE) return;

  const raw = String(event.raw_message || '').trim();
  if (!raw) return;

  const text = stripPrefix(raw);

  const d20 = handleD20(text);
  if (d20) {
    await sendMsg(ctx, event, d20);
    return;
  }

  const roll = handleRoll(text);
  if (roll) {
    await sendMsg(ctx, event, roll);
    return;
  }

  const choose = handleChoose(text);
  if (choose) {
    await sendMsg(ctx, event, choose);
    return;
  }

  const feature = resolveFeature(text);
  if (!feature) return;

  if (feature.type === 'text') {
    await sendMsg(ctx, event, feature.value);
    return;
  }

  if (feature.type === 'image') {
    await sendMsg(ctx, event, toCQImage(feature.value));
  }
};

export const plugin_get_config = async () => currentConfig;

export const plugin_on_config_change = async (ctx, ui, key, value, current) => {
  currentConfig = sanitizeConfig(current);
};

export const plugin_onevent = async () => {};
export const plugin_cleanup = async () => {
  logger?.info('fun-pack 已卸载');
  ctxRef = null;
};

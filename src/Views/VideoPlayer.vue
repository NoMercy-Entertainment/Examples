<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

import type { Option } from "@/types/types";

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue';
import { DesktopUIPlugin } from "@/components/VideoPlayer/plugins/UIPlugin/desktopUIPlugin";
import KeyHandlerPlugin from "@/components/VideoPlayer/plugins/UIPlugin/keyHandlerPlugin";

import Layout from "@/Views/Layout.vue";

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
});

const videoPlayerRef = ref<InstanceType<typeof VideoPlayer>>();
const isMounted = ref(false);

const subtitleOptions = ref<Option[]>([]);
const audioOptions = ref<Option[]>([]);

const currentLanguage = ref(localStorage.getItem('NoMercy-example-language') ?? 'de');

const languages: { code: string; name: string }[] = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'ar', name: 'العربية' },
  { code: 'bg', name: 'Български' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ca', name: 'Català' },
  { code: 'cs', name: 'Čeština' },
  { code: 'cy', name: 'Cymraeg' },
  { code: 'da', name: 'Dansk' },
  { code: 'de', name: 'Deutsch' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'et', name: 'Eesti' },
  { code: 'eu', name: 'Euskara' },
  { code: 'fa', name: 'فارسی' },
  { code: 'fi', name: 'Suomi' },
  { code: 'fr', name: 'Français' },
  { code: 'ga', name: 'Gaeilge' },
  { code: 'gl', name: 'Galego' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'he', name: 'עברית' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'hu', name: 'Magyar' },
  { code: 'hy', name: 'Հայերեն' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'is', name: 'Íslenska' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ka', name: 'ქართული' },
  { code: 'kk', name: 'Қазақша' },
  { code: 'km', name: 'ខ្មែរ' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ko', name: '한국어' },
  { code: 'ku', name: 'Kurdî' },
  { code: 'ky', name: 'Кыргызча' },
  { code: 'lo', name: 'ລາວ' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'mk', name: 'Македонски' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'mn', name: 'Монгол' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'my', name: 'မြန်မာ' },
  { code: 'nb', name: 'Norsk (Bokmål)' },
  { code: 'ne', name: 'नेपाली' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'nn', name: 'Norsk (Nynorsk)' },
  { code: 'no', name: 'Norsk' },
  { code: 'oc', name: 'Occitan' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
  { code: 'si', name: 'සිංහල' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'sq', name: 'Shqip' },
  { code: 'sr', name: 'Српски' },
  { code: 'sv', name: 'Svenska' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'tg', name: 'Тоҷикӣ' },
  { code: 'th', name: 'ภาษาไทย' },
  { code: 'tl', name: 'Filipino' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'uk', name: 'Українська' },
  { code: 'ur', name: 'اردو' },
  { code: 'uz', name: 'Oʻzbek' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'zh', name: '中文 (简体)' },
  { code: 'zh-TW', name: '中文 (繁體)' },
  { code: 'zu', name: 'isiZulu' },
];

const commonLanguageCodes = new Set([
  'en', 'es', 'fr', 'de', 'pt', 'pt-BR', 'it', 'nl',
  'ru', 'zh', 'zh-TW', 'ja', 'ko', 'ar', 'hi', 'tr', 'pl', 'sv',
]);

const switchLanguage = (code: string) => {
  currentLanguage.value = code;
  localStorage.setItem('NoMercy-example-language', code);
  isMounted.value = false;
  nextTick(() => { isMounted.value = true; });
};

const uiActive = ref(false);
const keyHandlerActive = ref(false);
let keyHandlerPlugin: KeyHandlerPlugin;
let desktopUIPlugin: DesktopUIPlugin;

watch(videoPlayerRef, (value) => {
  if (!value) return;

  const player = value.player;
  if (!player) return;

  window.player = player;

  player.on('ready', () => {
    console.log('ready');
  });

  player.on('playlist', (data) => {
    console.log('playlist', data);
  });

  player.on('item', (data) => {
    console.log('item', data);
  });

  player.on('playlistComplete', () => {
    console.log('playlistComplete');
  });

  player.on('bufferChange', () => {
    console.log('bufferChange');
  });

  player.on('firstFrame', () => {
    console.log('firstFrame');
  });

  player.on('play', () => {
    console.log('play');
  });

  player.on('pause', () => {
    console.log('pause');
  });

  player.on('buffer', () => {
    console.log('buffer');
  });

  player.on('idle', () => {
    console.log('idle');
  });

  player.on('complete', () => {
    console.log('complete');
  });

  player.on('error', () => {
    console.log('error');
  });

  player.on('seek', (data) => {
    console.log('seek', data);
  });
  player.on('seeked', (data) => {
    console.log('seeked', data);
  });

  player.on('time', (data) => {
    console.log('time', data);
  });

  player.on('mute', (data) => {
    console.log('mute', data);
  });
  player.on('volume', (data) => {
    console.log('volume', data);
  });

  player.on('fullscreen', (data) => {
    console.log('fullscreen', data);
  });

  player.on('theater', (enabled) => {
    console.log('theater', enabled);
    const container = document.getElementById('container');
    const menu = document.getElementById('menu');
    const wrapper = document.getElementById('wrapper');
    if (enabled) {
      menu?.classList.add('theater-hidden');
      wrapper?.classList.add('!max-w-none');
      container?.classList.add('!px-0', '!gap-0');
    } else {
      menu?.classList.remove('theater-hidden');
      wrapper?.classList.remove('!max-w-none');
      container?.classList.remove('!px-0', '!gap-0');
    }
  });

  player.on('pip', (enabled) => {
    console.log('pip', enabled);
    const wrapper = document.getElementById('wrapper');
    if (!wrapper) return;
    if (enabled) {
      wrapper.classList.remove('pip-float-exit');
      wrapper.classList.add('pip-float');
    } else {
      // Measure pip rect while still fixed
      const pipRect = wrapper.getBoundingClientRect();

      // Briefly swap to measure the flow rect without triggering a paint
      wrapper.classList.remove('pip-float');
      const fullRect = wrapper.getBoundingClientRect();
      wrapper.classList.add('pip-float');

      // With transform-origin: bottom right, scale grows toward top-left.
      // Translate aligns the two bottom-right corners so the anchor stays put.
      const scaleX = fullRect.width  / pipRect.width;
      const scaleY = fullRect.height / pipRect.height;
      const dx     = fullRect.right  - pipRect.right;
      const dy     = fullRect.bottom - pipRect.bottom;

      wrapper.style.transformOrigin = 'bottom right';

      const anim = wrapper.animate(
        [
          { transform: 'translate(0, 0) scale(1, 1)',                              borderRadius: '0.5rem' },
          { transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`, borderRadius: '0'     },
        ],
        { duration: 420, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' }
      );

      anim.onfinish = () => {
        anim.cancel();
        wrapper.classList.remove('pip-float');
        wrapper.style.transformOrigin = '';
      };
    }
  });

  player.on('resize', () => {
    console.log('resize');
  });

  player.on('levels', (data) => {
    console.log('levels', data);
  });

  player.on('levelsChanged', (data) => {
    console.log('levelsChanged', data);
  });

  player.on('audioTracks', (data) => {
    console.log('audioTracks', data);
  });

  player.on('audioTrackChanged', (data) => {
    console.log('audioTrackChanged', data);
  });

  player.on('subtitleList', (data) => {
    console.log('subtitleList', data);
  });

  player.on('subtitleChanged', (data) => {
    console.log('subtitleChanged', data?.id);
  });

  player.on('active', (showing) => {
    console.log('active', showing);
  });

  player.on('beforePlay', () => {
    console.log('beforePlay');
  });

  player.on('beforeComplete', () => {
    console.log('beforeComplete');
  });

  player.on('meta', () => {
    console.log('meta');
  });

  player.on('lastTimeTrigger', (data) => {
    console.log('lastTimeTrigger');
  });

  player.once('audioTrackChanging', (track) => {
    audioOptions.value = [{
      label: track.name,
      active: true,
      action: () => player.audioTrack(0),
    }]
  });
  player.on('audioTracks', (tracks) => {
    audioOptions.value = tracks.map((track, index) => {
      return {
        label: track.label ?? `Track ${index + 1}`,
        active: true,
        action: () => player.audioTrack(track.id!),
      };
    });
  });

  player.on('subtitleList', (tracks) => {
    const currentId = player.subtitle()?.id ?? -1;
    subtitleOptions.value = [
      {
        label: 'Off',
        active: currentId === -1,
        action: () => player.subtitle(-1),
      },
      ...tracks.map((track, index) => ({
        label: track.label ?? `Track ${index + 1}`,
        active: currentId === track.id,
        action: () => player.subtitle(track.id!),
      })),
    ];
  });

  player.on('subtitleChanged', (track) => {
    subtitleOptions.value = subtitleOptions.value.map((option, index) => {
      option.active = index - 1 === (track?.id ?? -1);
      return option;
    });
  });

  // Re-register active plugins on new player instance (handles language switch remounts)
  if (uiActive.value) {
    desktopUIPlugin = new DesktopUIPlugin();
    player.registerPlugin('desktopUI', desktopUIPlugin);
    player.usePlugin('desktopUI');
  }
  if (keyHandlerActive.value) {
    keyHandlerPlugin = new KeyHandlerPlugin();
    player.registerPlugin('keyHandler', keyHandlerPlugin);
    player.usePlugin('keyHandler');
  }

});

const toggleUI = () => {
  if (!uiActive.value) {
    uiActive.value = true;
    desktopUIPlugin = new DesktopUIPlugin();
    videoPlayerRef.value?.player?.registerPlugin('desktopUI', desktopUIPlugin);
    videoPlayerRef.value?.player?.usePlugin('desktopUI');
  }
  else {
    uiActive.value = false;
    videoPlayerRef.value?.player?.plugins.get('desktopUI')?.dispose();
  }

  localStorage.setItem('NoMercy-example-video-ui', uiActive.value.toString());
};

const toggleKeyHandler = () => {
  if (!keyHandlerActive.value) {
    keyHandlerActive.value = true;
    keyHandlerPlugin = new KeyHandlerPlugin();
    videoPlayerRef.value?.player?.registerPlugin('keyHandler', keyHandlerPlugin);
    videoPlayerRef.value?.player?.usePlugin('keyHandler');
  }
  else {
    keyHandlerActive.value = false;
    videoPlayerRef.value?.player?.plugins.get('keyHandler')?.dispose();
  }
  localStorage.setItem('NoMercy-example-video-keyhandler', keyHandlerActive.value.toString());
};

const options = computed<Option[]>(() => [
  {
    label: 'Play',
    level: 0,
    action: () => videoPlayerRef.value?.player?.play(),
  },
  {
    label: 'Pause',
    level: 0,
    action: () => videoPlayerRef.value?.player?.pause(),
  },
  {
    label: 'Fullscreen',
    action: () => videoPlayerRef.value?.player?.enterFullscreen(),
  },
  {
    label: 'Settings',
    level: 0,
    options: [
      {
        label: 'Subtitles',
        options: subtitleOptions.value as unknown as Option[],
      },
      {
        label: 'Audio',
        options: audioOptions.value as unknown as Option[],
      },
    ]
  },
  {
    label: 'Plugins',
    level: 0,
    options: [
      {
        label: 'UI',
        action: toggleUI,
        active: uiActive,
      },
      {
        label: 'KeyHandler',
        action: toggleKeyHandler,
        active: keyHandlerActive,
      },
    ]
  },
  {
    label: 'Language',
    level: 0,
    options: [
      ...languages
        .filter(lang => commonLanguageCodes.has(lang.code))
        .map(lang => ({
          label: `${lang.name} (${lang.code})`,
          active: currentLanguage.value === lang.code,
          action: () => switchLanguage(lang.code),
        })),
      {
        label: 'More languages…',
        options: languages
          .filter(lang => !commonLanguageCodes.has(lang.code))
          .map(lang => ({
            label: `${lang.name} (${lang.code})`,
            active: currentLanguage.value === lang.code,
            action: () => switchLanguage(lang.code),
          })),
      },
    ],
  },
]);

onMounted(() => {
  isMounted.value = true;
  nextTick(() => {

    if (localStorage.getItem('NoMercy-example-video-ui') == null || localStorage.getItem('NoMercy-example-video-ui') === 'true') {
      toggleUI();
    }
    if (localStorage.getItem('NoMercy-example-video-keyhandler') === 'true') {
      toggleKeyHandler();
    }
  });
});

onUnmounted(() => {
  isMounted.value = false;
});

</script>

<template>
  <Layout :theme="theme" title="NoMercy Entertainment - Video Player" :options="options as Option[]">
    <VideoPlayer v-if="isMounted" ref="videoPlayerRef" :language="currentLanguage" />
    <div
      class="flex flex-1 text-left mx-auto transform transition-transform duration-300 hover:scale-105 h-14 max-h-14">
      <pre id="output" class="d-inline-block text-left mb-0 scale-50 h-20"
        style="font-size: 6px;">$$\   $$\           $$\      $$\                                               $$$$$$$$\ $$\    $$\ <br>$$$\  $$ |          $$$\    $$$ |                                              \__$$  __|$$ |   $$ |<br>$$$$\ $$ | $$$$$$\  $$$$\  $$$$ | $$$$$$\   $$$$$$\   $$$$$$$\ $$\   $$\          $$ |   $$ |   $$ |<br>$$ $$\$$ |$$  __$$\ $$\$$\$$ $$ |$$  __$$\ $$  __$$\ $$  _____|$$ |  $$ |         $$ |   \$$\  $$  |<br>$$ \$$$$ |$$ /  $$ |$$ \$$$  $$ |$$$$$$$$ |$$ |  \__|$$ /      $$ |  $$ |         $$ |    \$$\$$  / <br>$$ |\$$$ |$$ |  $$ |$$ |\$  /$$ |$$   ____|$$ |      $$ |      $$ |  $$ |         $$ |     \$$$  /  <br>$$ | \$$ |\$$$$$$  |$$ | \_/ $$ |\$$$$$$$\ $$ |      \$$$$$$$\ \$$$$$$$ |         $$ |      \$  /   <br>\__|  \__| \______/ \__|     \__| \_______|\__|       \_______| \____$$ |         \__|       \_/    <br>                                                               $$\   $$ |                           <br>                                                               \$$$$$$  |                           <br>                                                                \______/                            </pre>
    </div>
  </Layout>
</template>

<style scoped>
pre {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 1em;
}

pre {
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  -ms-overflow-style: scrollbar;
}

pre {
  display: block;
  font-size: 87.5%;
}

.d-inline-block {
  display: inline-block !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.text-left {
  text-align: left !important;
}

pre {
  line-height: 1.15;
}
</style>

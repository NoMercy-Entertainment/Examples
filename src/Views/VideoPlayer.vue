<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";

import type {NMPlayer, TimeData} from "@nomercy-entertainment/nomercy-video-player/src/types";
import KeyHandlerPlugin from "@nomercy-entertainment/nomercy-video-player/src/plugins/keyHandlerPlugin";
import {DesktopUIPlugin} from "@/components/VideoPlayer/plugins/UIPlugin/desktopUIPlugin";
import {OctopusPlugin} from "@nomercy-entertainment/nomercy-video-player/src/plugins/octopusPlugin";
import {SabrePlugin} from "@nomercy-entertainment/nomercy-video-player/src/plugins/sabrePlugin";

import type {Option} from "@/types/types";

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue';
import Layout from "@/Views/Layout.vue";

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
});

const videoPlayerRef = ref<{ player: NMPlayer }>();
const isMounted = ref(false);

const subtitleOptions = ref<Option[]>([]);
const audioOptions = ref<Option[]>([]);

const uiActive = ref(false);
const keyHandlerActive = ref(false);
const opusActive = ref(false);
const sabreActive = ref(false);

const keyHandlerPlugin = new KeyHandlerPlugin();
const desktopUIPlugin = new DesktopUIPlugin();
const octopusPlugin = new OctopusPlugin();
const sabrePlugin = new SabrePlugin();

const loadMenu = ref(false);

watch(videoPlayerRef, (value) => {
  if (!value) return;
  const player = value.player;

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

  player.on('seek', (data: TimeData) => {
    console.log('seek', data);
  });
  player.on('seeked', (data: TimeData) => {
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

  player.on('captionsList', (data) => {
    console.log('captionsList', data);
  });

  player.on('captionsChanged', (data) => {
    console.log('captionsChanged', data.id);
  });

  player.on('controls', (showing) => {
    console.log('controls', showing);
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
      action: () => player.setCurrentAudioTrack(0),
    }]
  });
  player.on('audioTracks', (tracks) => {
    audioOptions.value = tracks.map((track, index) => {
      return {
        label: track.label ?? `Track ${index + 1}`,
        active: true,
        action: () => player.setCurrentAudioTrack(track.id!),
      };
    });
  });

  player.on('captionsList', (tracks) => {
    subtitleOptions.value = tracks.map((track, index) => {
      return {
        label: track.label ?? `Track ${index + 1}`,
        active: tracks.indexOf(player.getCurrentCaptions()!) == index,
        action: () => player.setCurrentCaption(track.id!),
      };
    });
  });

  player.on('captionsChanged', (track) => {
    subtitleOptions.value = subtitleOptions.value.map((option, index) => {
      option.active = index - 1 === track.id;
      return option;
    });
  });

  player.once('translationsLoaded', () => {
    loadMenu.value = true;
  });
});

const toggleUI = () => {
  if (!uiActive.value) {
    uiActive.value = true;
    videoPlayerRef.value?.player.registerPlugin('desktopUI', desktopUIPlugin);
    videoPlayerRef.value?.player.usePlugin('desktopUI');

    console.log('desktopUI', videoPlayerRef.value?.player.plugins.get('desktopUI'));
    setTimeout(() => {
      console.log('timeout')
      if (loadMenu.value && window.nmplayer().plugins.get('desktopUI').mainMenu.childNodes.length == 1) {
        console.log('loadMenu', loadMenu.value, window.nmplayer().plugins.get('desktopUI').mainMenu.childNodes.length);
        videoPlayerRef.value?.player?.emit('translationsLoaded');
      }
    }, 1500);
  }
  else {
    uiActive.value = false;
    videoPlayerRef.value?.player.plugins.get('desktopUI').dispose();
  }

  localStorage.setItem('NoMercy-example-video-ui', uiActive.value.toString());
};

const toggleKeyHandler = () => {
  if (!keyHandlerActive.value) {
    keyHandlerActive.value = true;
    videoPlayerRef.value?.player.registerPlugin('keyHandler', keyHandlerPlugin);
    videoPlayerRef.value?.player.usePlugin('keyHandler');
  }
  else {
    keyHandlerActive.value = false;
    videoPlayerRef.value?.player.plugins.get('keyHandler').dispose();
  }
  localStorage.setItem('NoMercy-example-video-keyhandler', keyHandlerActive.value.toString());
};

const toggleOpus = () => {
  if (sabreActive.value) {
    sabreActive.value = false;
    videoPlayerRef.value?.player.plugins.get('sabre').dispose();
  }

  if (!opusActive.value) {
    opusActive.value = true;
    videoPlayerRef.value?.player.registerPlugin('octopus', octopusPlugin);
    videoPlayerRef.value?.player.usePlugin('octopus');
  }
  else {
    opusActive.value = false;
    videoPlayerRef.value?.player.plugins.get('octopus').dispose();
  }
};

const toggleSabre = () => {
  if (opusActive.value) {
    opusActive.value = false;
    videoPlayerRef.value?.player.plugins.get('octopus').dispose();
  }

  if (!sabreActive.value) {
    sabreActive.value = true;
    videoPlayerRef.value?.player.registerPlugin('sabre', sabrePlugin);
    videoPlayerRef.value?.player.usePlugin('sabre');
  }
  else {
    sabreActive.value = false;
    videoPlayerRef.value?.player.plugins.get('sabre').dispose();
  }
};

const options = ref<Option[]>([
  {
    label: 'Play',
    level: 0,
    action: () => videoPlayerRef.value?.player.play(),
  },
  {
    label: 'Pause',
    level: 0,
    action: () => videoPlayerRef.value?.player.pause(),
  },
  {
    label: 'Fullscreen',
    action: () => videoPlayerRef.value?.player.enterFullscreen(),
  },
  {
    label: 'Settings',
    level: 0,
    options: [
      {
        label: 'Subtitles',
        options: subtitleOptions as unknown as Option[],
      },
      {
        label: 'Audio',
        options: audioOptions as unknown as Option[],
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
    <VideoPlayer v-if="isMounted" ref="videoPlayerRef"/>
    <div class="flex flex-1 text-left mx-auto transform transition-transform duration-300 hover:scale-105 h-14 max-h-14 -mt-2">
      <pre id="output" class="d-inline-block text-left mb-0 scale-50 h-20" style="font-size: 6px;">$$\   $$\           $$\      $$\                                               $$$$$$$$\ $$\    $$\ <br>$$$\  $$ |          $$$\    $$$ |                                              \__$$  __|$$ |   $$ |<br>$$$$\ $$ | $$$$$$\  $$$$\  $$$$ | $$$$$$\   $$$$$$\   $$$$$$$\ $$\   $$\          $$ |   $$ |   $$ |<br>$$ $$\$$ |$$  __$$\ $$\$$\$$ $$ |$$  __$$\ $$  __$$\ $$  _____|$$ |  $$ |         $$ |   \$$\  $$  |<br>$$ \$$$$ |$$ /  $$ |$$ \$$$  $$ |$$$$$$$$ |$$ |  \__|$$ /      $$ |  $$ |         $$ |    \$$\$$  / <br>$$ |\$$$ |$$ |  $$ |$$ |\$  /$$ |$$   ____|$$ |      $$ |      $$ |  $$ |         $$ |     \$$$  /  <br>$$ | \$$ |\$$$$$$  |$$ | \_/ $$ |\$$$$$$$\ $$ |      \$$$$$$$\ \$$$$$$$ |         $$ |      \$  /   <br>\__|  \__| \______/ \__|     \__| \_______|\__|       \_______| \____$$ |         \__|       \_/    <br>                                                               $$\   $$ |                           <br>                                                               \$$$$$$  |                           <br>                                                                \______/                            </pre>
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

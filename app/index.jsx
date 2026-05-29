import { useRef } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

const BANNER_ID = 'ca-app-pub-8207974891572934/8785795460';
const INTER_ID  = 'ca-app-pub-8207974891572934/2823022347';
const interstitial = InterstitialAd.createForAdRequest(INTER_ID);

const HTML = `<!DOCTYPE html><html><body style="background:#0a0a0f;color:#00f5ff;font-family:monospace;text-align:center;padding-top:40vh">
<h1>TURBO DASH</h1><p>Game loading...</p></body></html>`;

export default function GameScreen() {
  const webRef = useRef(null);

  function onMessage(event) {
    if (event.nativeEvent.data === 'GAME_OVER') {
      const unsub = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
        unsub();
      });
      interstitial.load();
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        ref={webRef}
        source={{ html: HTML }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        onMessage={onMessage}
      />
      <BannerAd
        unitId={BANNER_ID}
        size={BannerAdSize.BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  webview: { flex: 1 },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { AppRegistry, Text, TextInput } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import 'react-native-gesture-handler';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import LocalizationContext from './LocalizationContext';
import * as I18n from './Src/i18n';
import store from './Src/Store';
import { alreadyLogin } from './Src/Store/Actions/userAction';

const AppRedux = () => {
  store.dispatch(alreadyLogin());
  const [locale, setLocale] = React.useState(I18n.DEFAULT_LANGUAGE);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => I18n.t(scope, {locale, ...options}),
      locale,
      setLocale: newLocale => {
        const newSetLocale = I18n.setI18nConfig(newLocale);
        setLocale(newSetLocale);
      },
    }),
    [locale],
  );

  const getLanguage = async () => {
    try {
      const lang = await AsyncStorage.getItem('@language');
      if (lang !== null) {
        handleLocalizationChange(lang);
      } else handleLocalizationChange('');
    } catch (e) {
    }
  };

  const handleLocalizationChange = React.useCallback(
    newLocale => {
      const newSetLocale = I18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  React.useEffect(() => {
    getLanguage();
    EventRegister.addEventListener('changeLanguage', handleLocalizationChange);
    return () => {
      EventRegister.removeEventListener(
        'changeLanguage',
        handleLocalizationChange,
      );
    };
  }, []);

 
  return (
    <Provider {...{store}}>
      <LocalizationContext.Provider value={localizationContext}>
        <App />
      </LocalizationContext.Provider>
      {/* <SafeAreaProvider>
                <App />
            </SafeAreaProvider> */}
    </Provider>
  );
};

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => AppRedux);

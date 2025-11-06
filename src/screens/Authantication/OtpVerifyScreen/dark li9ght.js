   
   
   const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const SettingsScreenStyles = useMemo(() => SettingsScreenStyle(Colors), [Colors]);
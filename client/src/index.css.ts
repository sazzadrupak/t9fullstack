import { globalStyle } from '@vanilla-extract/css';
import { DEFAULT_FONT, FONT_ROBOTO_SANS_SERIF } from './shared.css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  font: `400 ${DEFAULT_FONT} ${FONT_ROBOTO_SANS_SERIF}`,
});

globalStyle('#root', {
  height: '100%',
});

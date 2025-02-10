import { style } from '@vanilla-extract/css';
import { COLOR_BORDER } from '../shared.css';

export const container = style({
  marginTop: 8,
  marginLeft: 16,
  marginRight: 16,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  overflowY: 'auto',
  width: '100%',
  maxWidth: 600,
});
export const wordRow = style({
  height: 31,
  borderBottom: `1px solid ${COLOR_BORDER}`,
});
export const word = style({
  paddingLeft: 8,
});
export const skeleton = style({
  height: '100%',
  width: '100%',
});

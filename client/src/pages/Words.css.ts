import { style } from '@vanilla-extract/css';
import { COLOR_BORDER, FONT_REGULAR } from '../shared.css';

export const container = style({
  marginTop: 8,
  marginLeft: 16,
  marginRight: 16,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${COLOR_BORDER}`,
  borderRadius: 4,
  overflowY: 'auto',
  width: '100%',
  maxWidth: 600,
  maxHeight: 650,
  ':empty': {
    border: 0,
  },
});
export const wordRow = style({
  display: 'flex',
  alignItems: 'center',
  height: 31,
  borderBottom: `1px solid ${COLOR_BORDER}`,
  flexShrink: 0,
  ':last-child': {
    borderBottom: 0,
  },
  selectors: {
    '&:nth-child(2n)': {
      background: COLOR_BORDER,
    },
  },
});
export const word = style({
  paddingLeft: 8,
  fontSize: FONT_REGULAR,
});

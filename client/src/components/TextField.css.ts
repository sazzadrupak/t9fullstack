import { style } from '@vanilla-extract/css';
import { COLOR_INPUT_BORDER, COLOR_LINK, FONT_REGULAR } from '../shared.css';

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  maxWidth: '100%',
  height: '100%',
  border: `1px solid ${COLOR_INPUT_BORDER}`,
  borderRadius: 8,
  fontSize: FONT_REGULAR,
  fontWeight: 400,
  color: '#000000',
  background: '#ffffff',
});

export const textField = style({
  position: 'absolute',
  top: -2,
  right: -2,
  bottom: -2,
  left: -2,
  display: 'block',
  padding: 2,
  margin: 0,
  border: 0,
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  textIndent: 8,
  backgroundColor: 'transparent',
  ':focus': {
    outline: 0,
    borderRadius: 8,
    right: -1,
    boxShadow: `inset 0 0 0 3px ${COLOR_LINK}`,
  },
});

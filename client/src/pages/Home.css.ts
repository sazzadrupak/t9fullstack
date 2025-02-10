import { style } from '@vanilla-extract/css';
import { FONT_BIG, FONT_WEIGHT_SEMI_BOLD } from '../shared.css';

export const container = style({
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const header = style({
  padding: '8px 0 16px 0',
  fontSize: FONT_BIG,
  fontWeight: FONT_WEIGHT_SEMI_BOLD,
});

export const textFieldContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: 600,
  boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset`,
  borderRadius: 8,
  height: 48,
});
export const textField = style({
  display: 'flex',
  borderRadius: 8,
  flex: 1,
});

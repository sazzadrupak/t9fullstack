import { style } from '@vanilla-extract/css';
import { COLOR_DANGER, FONT_REGULAR } from '../shared.css';

export const container = style({
  margin: 5,
  width: 600,
});

export const error = style({
  padding: 20,
  border: '1px solid #eee',
  borderRadius: 3,
  margin: '10px auto',
  fontSize: FONT_REGULAR,
  borderLeft: `3px solid ${COLOR_DANGER}`,
  backgroundColor: `rgba(217, 83, 79, 0.1)`,
  color: COLOR_DANGER,
});

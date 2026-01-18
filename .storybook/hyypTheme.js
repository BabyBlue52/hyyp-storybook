import { create } from 'storybook/theming';
import logo from '../src/assets/hyyp.svg';
 
export default create({
  base: 'dark',
  brandTitle: 'HYYP Storybook',
  brandUrl: '/',
  brandImage: logo,
  brandTarget: '_self',
});
import { create } from 'storybook/theming';
import logo from '../src/assets/logos/hyyp.svg';
 
export default create({
  base: 'dark',
  brandTitle: 'HYYP Storybook',
  brandUrl: '/',
  brandImage: logo,
  brandTarget: '_self',
});
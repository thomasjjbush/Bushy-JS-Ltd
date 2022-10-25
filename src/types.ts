import type { store } from '@store/store';

export interface Asset {
  title: string;
  url: string;
}

export interface Client {
  logo: Asset;
  name: string;
  primaryColor: string;
  requiresInverseLogo: boolean;
  secondaryColor: string;
  slug: string;
  url: string;
}

export interface Comment {
  _id: string;
  author: User;
  comment: string;
  date: string;
  project: string;
  state?: 'loading' | 'insert-error' | 'delete-error';
}

export interface Employment {
  companyName: string;
  endDate: string;
  location: {
    lat: string;
    long: string;
  };
  responsibilities: string;
  startDate: string;
  title: string;
  url: string;
}

export enum Endpoints {
  CONTACT = '/contact',
  DELETE_PROJECT_COMMENT = '/project/:slug/comment/:commentId',
  DELETE_PROJECT_LIKE = '/project/:slug/like',
  GET_EMPLOYMENT = '/employment',
  GET_MORE = '/project/:slug/more/:content',
  GET_PROJECT = '/project/:slug',
  GET_PROJECTS = '/projects',
  GET_RELATED_PROJECTS = '/project/:slug/related',
  POST_PROJECT_COMMENT = '/project/:slug/comment',
  POST_PROJECT_LIKE = '/project/:slug/like',
  SIGN_IN = '/sign-in',
  SIGN_OUT = '/sign-out',
}

export enum Icons {
  ADD_COMMENT = 'iconAddComment',
  ARCHITECTURE = 'iconArchitecture',
  BUG = 'iconBug',
  CHEVRON_LEFT = 'iconChevronLeft',
  CHEVRON_RIGHT = 'iconChevronRight',
  CI = 'iconCi',
  CLOSE = 'iconClose',
  COMMENT = 'iconComment',
  CONTACT = 'iconContact',
  CONTACT_SUBMIT = 'iconContactSubmit',
  DARK_MODE = 'iconDarkMode',
  DELETE = 'iconDelete',
  DESIGN = 'iconDesign',
  EMOLOYMENT = 'iconEmployment',
  ESTIMATION = 'iconEstimation',
  GITHUB = 'iconGithub',
  GREENFIELD = 'iconGreenfield',
  HOME = 'iconHome',
  LIKE = 'iconLike',
  LIKED = 'iconLikeLiked',
  LINKEDIN = 'iconLinkedin',
  LOCALE = 'iconLocale',
  LOCKED = 'iconLocked',
  MENTORING = 'iconMentoring',
  MENU = 'iconMenu',
  NEW_FEATURE = 'iconNewFeatures',
  PROJECTS = 'iconProjects',
  REVIEW = 'iconReview',
  SEARCH = 'iconSearch',
  SHARE = 'iconShare',
  SIGN_IN = 'iconSignIn',
  SIGN_OUT = 'iconSignOut',
  TESTING = 'iconTesting',
  UI = 'iconUI',
  WHATSAPP = 'iconWhatsapp',
}

export interface Like {
  _id: string;
  author: User;
  date: Date;
  project: string;
}

export type Locales = 'en' | 'fr';

export interface Project {
  client: Client;
  commentCount: number;
  comments: Comment[];
  description: string;
  gallery: Asset[];
  hasLiked: boolean;
  hero: Asset;
  likeCount: number;
  likes: Like[];
  name: string;
  primaryTag: Tag;
  responsibilities: Responsibility[];
  slug: string;
  tags: Tag[];
  thumbnail: Asset;
  video: Asset;
  year: number;
}

export interface Rejected {
  message: string;
  status: number;
}

interface Responsibility {
  description: string;
  icon: Icons;
  name: string;
}

export type Store = ReturnType<typeof store.getState>;

export interface Tag {
  name: string;
  slug: string;
}

export type Theme = 'dark' | 'light';

export interface User {
  _id: string;
  color?: string;
  email?: string;
  initials: string;
  name: string;
  profilePicture: string;
}

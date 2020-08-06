import { ArticleDetails } from './ArticleDetails';
import {ArticlePicture} from './ArticlePicture';

export class Article {

  reference: string;
  label: string;
  unitPrice?: number;
  family?: string;
  articleImage?: ArticlePicture;
  articleDetails?: ArticleDetails;
  finalPrice?: number;
  AC_PrixVen?: number;
  AC_Remise?: number;
}

import { ImageArticle } from './ImageArticle';
import { Description } from './Description';

export class Article {

  reference: string;
  label: string;
  unitPrice: number;
  family: string;
  articlePicture: ImageArticle;
  articleDetails: Description;
  finalPrice: number;

}

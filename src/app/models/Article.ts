import { ArticlePicture } from './ArticlePicture';
import { ArticleDetails } from './ArticleDetails';

export class Article {

  reference: string;
  label: string;
  unitPrice: number;
  family: string;
  articleImage: ArticlePicture;
  articleDetails: ArticleDetails;
  finalPrice: number;

}

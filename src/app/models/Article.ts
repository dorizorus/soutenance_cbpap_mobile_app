import { ImageArticle } from './ImageArticle';
import { Description } from './Description';

export class Article{
  ref: string;
  libelle:string;
  prixUnitaire:number;
  famille:string;
  image : ImageArticle;
  description : Description;
}

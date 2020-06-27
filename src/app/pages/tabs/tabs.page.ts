import { Component, OnInit } from '@angular/core';
import {ProduitsPage} from "../produits/produits.page";
import {HistoriquePage} from "../historique/historique.page";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  private appareilsPage = ProduitsPage;
  private historiquePage = HistoriquePage;
}

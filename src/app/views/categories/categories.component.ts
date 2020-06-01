import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  //update категорию
  @Output()
  editCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  //выбор категории
  @Input()
  selectedCategory: Category;

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  searchCategories = new EventEmitter<string>();

  @Input()
  categories: Category[];
  indexMouseMove: number;
  searchCategoryTitle: string;

  constructor(private dataSource: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) return;
    this.selectedCategory = category;
    this.selectCategory.emit(category);
  }

  showEditIcon(curLine: number) {
    this.indexMouseMove = curLine;
  }

  openEditDialog(category: Category) {
    let matDialogRef = this.dialog.open(EditCategoryDialogComponent, {data: [category], autoFocus: false});
    matDialogRef.afterClosed().subscribe(result => {
      if (result == null) return;
      if (result == 'delete') {
        this.deleteCategory.emit(category);
      } else {
        this.editCategory.emit(result);
      }
    });
  }

  search() {
    this.searchCategories.emit(this.searchCategoryTitle);
  }
}

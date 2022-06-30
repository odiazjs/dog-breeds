import { Attribute, Base, Brand, Distributor, Ingredient, Product, Taxonomy } from './base-model';

export interface BaseVM extends Base {}

export interface BrandVM extends Brand {}

export interface ProductVM extends Product {}

export interface DistributorVM extends Distributor {}

export interface TaxonomyVM extends Taxonomy {}

export interface IngredientVM extends Ingredient {}

export interface AttributeVM extends Attribute {}

import type { AxiosInstance } from "axios";
import type { AxiosCacheInstance } from "axios-cache-interceptor";
import type { ComputedRef } from "vue";

export type TApiClient = AxiosInstance | AxiosCacheInstance;

export interface ColumnDefinition {
  handle: string;
  name: string;
}

export interface IRelationDefinition {
  definition: string;
  id: string;
  display: string;
  api: Record<string, TApiClient>;
}

export type TChoice = Array<{
  value: string;
  name: string;
}>;

export interface FieldDefinition {
  handle: string;
  name: string;
  input: "short-text" | "long-text" | "select" | "relation" | string;
  options?: {
    note: string;
    isMultiple?: boolean;
    display?: string;
    choices?: TChoice;
    range?: boolean;
  };
  relation?: IRelationDefinition;
}

export type FieldDefinitionsFromModel<TModel> = {
  [K in keyof TModel]: FieldDefinition & { handle: K };
};

export type TFilter = Array<{
  handle: string;
  operator: string;
  value: any;
}>;

export type TModelFilter = Array<{
  id: string;
  display: string;
  input: "select" | "relation" | "date";
  definition?: string;
  name: string;
  query?: ComputedRef<TFilter>;
  choices?: TChoice;
}>;

export type TMeta = {
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type TFinalQuery = {
  limit: number;
  page: number;
  search: string;
  filter: TFilter;
};

export type ModelMeta = {
  label: string;
  definition: string;
  id: string;
  info: {
    icon: string;
    display: string;
  };
  excludes: Array<
    "create" | "edit" | "delete" | "duplicate" | "refresh" | "search"
  >;
  includes: string[];
  filters: TModelFilter;
  collection: {
    path: string;
    columns: ColumnDefinition[];
  };
  single: {
    path: string;
    fields: Record<string, FieldDefinition>;
  };
};

export type TFilter = Array<{
  handle: string;
  operator: string;
  value: any;
}>;

export interface TArgsFetch {
  query: TFilter;
}

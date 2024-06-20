
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum PropertyType {
    Approved = "Approved",
    InReview = "InReview",
    Rejected = "Rejected"
}

export enum Rol {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    User = "User",
    Prospect = "Prospect",
    cat = "cat"
}

export interface FilterOneArgs {
    where?: Nullable<JSONObject>;
    id?: Nullable<string>;
}

export interface FilterArgs {
    where?: Nullable<JSONObject>;
    search?: Nullable<string>;
    sort?: Nullable<JSONObject>;
    skip: number;
    limit: number;
}

export interface CreatePropertyInput {
    name: string;
    street: string;
    numberExt: number;
    numberInt?: Nullable<number>;
    zipCode: string;
    catId?: Nullable<string>;
    userId?: Nullable<string>;
}

export interface CreateCatInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdatePropertyInput {
    name: string;
    street: string;
    numberExt: number;
    numberInt?: Nullable<number>;
    zipCode: string;
    catId?: Nullable<string>;
    type: PropertyType;
    userId?: Nullable<string>;
}

export interface UpdatecatInput {
    firstName: string;
    lastName: string;
    avatar: string;
    rol: Rol;
}

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    firstName: string;
    lastName: string;
    avatar: string;
    rol: Rol;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface PropertyGql {
    _id: string;
    name: string;
    age?: Nullable<number>;
    breed?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    deletedAt?: Nullable<DateTime>;
    userId?: Nullable<string>;
    street: string;
    numberExt: number;
    numberInt?: Nullable<number>;
    zipCode: string;
    type: PropertyType;
    user?: Nullable<UserGql>;
}

export interface PaginatedProperty {
    nodes?: Nullable<PropertyGql[]>;
    totalcount: number;
    totalCount: number;
}

export interface CatsGql {
    _id: string;
    name: string;
    age?: Nullable<number>;
    breed: string;
}

export interface PaginatedCats {
    nodes?: Nullable<CatsGql[]>;
    totalcount: number;
}

export interface IQuery {
    property(filter: FilterOneArgs): PropertyGql | Promise<PropertyGql>;
    properties(filter?: Nullable<FilterArgs>): PaginatedProperty | Promise<PaginatedProperty>;
    cat(filter: FilterOneArgs): CatsGql | Promise<CatsGql>;
    cats(filter?: Nullable<FilterArgs>): PaginatedCats | Promise<PaginatedCats>;
    user(filter: FilterOneArgs): UserGql | Promise<UserGql>;
    users(filter?: Nullable<FilterArgs>): PaginatedUser | Promise<PaginatedUser>;
}

export interface IMutation {
    createProperty(entity: CreatePropertyInput): PropertyGql | Promise<PropertyGql>;
    createPropertyWithcat(property: CreatePropertyInput, cat: CreateCatInput): PropertyGql | Promise<PropertyGql>;
    updateProperty(id: string, entity: UpdatePropertyInput): PropertyGql | Promise<PropertyGql>;
    deleteProperty(id: string): PropertyGql | Promise<PropertyGql>;
    createCat(entity: CreateCatInput): CatsGql | Promise<CatsGql>;
    updateCat(id: string, entity: UpdatecatInput): CatsGql | Promise<CatsGql>;
    deleteCat(id: string): CatsGql | Promise<CatsGql>;
    createPropertyWithUser(property: CreatePropertyInput, user: CreateUserInput): PropertyGql | Promise<PropertyGql>;
    createUser(entity: CreateUserInput): UserGql | Promise<UserGql>;
    updateUser(id: string, entity: UpdateUserInput): UserGql | Promise<UserGql>;
    deleteUser(id: string): UserGql | Promise<UserGql>;
    login(entity: LoginInput): UserGql | Promise<UserGql>;
}

export interface UserGql {
    _id: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    deletedAt?: Nullable<DateTime>;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: Nullable<string>;
    rol: Rol;
}

export interface PaginatedUser {
    nodes?: Nullable<UserGql[]>;
    totalCount: number;
}

export type JSONObject = any;
export type DateTime = any;
type Nullable<T> = T | null;

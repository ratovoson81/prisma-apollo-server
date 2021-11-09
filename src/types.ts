import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type ArgsGetGroupePerUser = {
  id: Scalars['Int'];
};

export type ArgsGroupe = {
  name?: Maybe<Scalars['String']>;
  users: Array<Scalars['Int']>;
};

export type ArgsMessageChat = {
  idFrom: Scalars['Int'];
  idTo: Scalars['Int'];
};

export type AuthPayLoad = {
  __typename?: 'AuthPayLoad';
  token: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Groupe = {
  __typename?: 'Groupe';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  users: Array<ReturnGroupe>;
  messages: Array<Message>;
};

export type IdUser = {
  id: Scalars['Int'];
};

export type LoginAuthReturn = {
  __typename?: 'LoginAuthReturn';
  theUser: User;
  token: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  content: Scalars['String'];
  author: User;
  date: Scalars['DateTime'];
};

export type MessageChat = {
  __typename?: 'MessageChat';
  id: Scalars['Int'];
  content: Scalars['String'];
  from: User;
  to: User;
  date: Scalars['DateTime'];
  mine: Scalars['Boolean'];
};

export type MessageInput = {
  content: Scalars['String'];
  idFrom: Scalars['Int'];
  idGroupe: Scalars['Int'];
  date: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  incrementPostViewCount?: Maybe<Post>;
  signupUser: AuthPayLoad;
  togglePublishPost?: Maybe<Post>;
  loginUser: LoginAuthReturn;
  logout: Scalars['Boolean'];
  isLogged?: Maybe<User>;
  sendMessage: Message;
  createGroupe: Groupe;
};


export type MutationCreateDraftArgs = {
  authorEmail: Scalars['String'];
  data: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['Int'];
};


export type MutationSignupUserArgs = {
  data: UserCreateInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  data?: Maybe<UserLoginInput>;
};


export type MutationSendMessageArgs = {
  data: MessageInput;
};


export type MutationCreateGroupeArgs = {
  data: ArgsGroupe;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
};

export type PostCreateInput = {
  content?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  draftsByUser?: Maybe<Array<Maybe<Post>>>;
  feed: Array<Post>;
  postById?: Maybe<Post>;
  message: Array<Message>;
  messageByUser: Array<Message>;
  getChat: Array<Message>;
  allUsersMessageByMe: Array<User>;
  allGroupe: Array<Groupe>;
  allGroupeByUser: Array<Groupe>;
};


export type QueryDraftsByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryFeedArgs = {
  orderBy?: Maybe<PostOrderByUpdatedAtInput>;
  searchString?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPostByIdArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryMessageByUserArgs = {
  data: ArgsMessageChat;
};


export type QueryGetChatArgs = {
  data: ArgsMessageChat;
};


export type QueryAllUsersMessageByMeArgs = {
  data: IdUser;
};


export type QueryAllGroupeByUserArgs = {
  data: ArgsGetGroupePerUser;
};

export type ReturnGroupe = {
  __typename?: 'ReturnGroupe';
  userId?: Maybe<Scalars['Int']>;
  groupeId?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  posts: Array<Post>;
  imageUrl?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  posts?: Maybe<Array<PostCreateInput>>;
  image: Scalars['Upload'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArgsGetGroupePerUser: ArgsGetGroupePerUser;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ArgsGroupe: ArgsGroupe;
  String: ResolverTypeWrapper<Scalars['String']>;
  ArgsMessageChat: ArgsMessageChat;
  AuthPayLoad: ResolverTypeWrapper<AuthPayLoad>;
  CacheControlScope: CacheControlScope;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  File: ResolverTypeWrapper<File>;
  Groupe: ResolverTypeWrapper<Groupe>;
  IdUser: IdUser;
  LoginAuthReturn: ResolverTypeWrapper<LoginAuthReturn>;
  Message: ResolverTypeWrapper<Message>;
  MessageChat: ResolverTypeWrapper<MessageChat>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MessageInput: MessageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostCreateInput: PostCreateInput;
  PostOrderByUpdatedAtInput: PostOrderByUpdatedAtInput;
  Query: ResolverTypeWrapper<{}>;
  ReturnGroupe: ResolverTypeWrapper<ReturnGroupe>;
  SortOrder: SortOrder;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserCreateInput: UserCreateInput;
  UserLoginInput: UserLoginInput;
  UserUniqueInput: UserUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArgsGetGroupePerUser: ArgsGetGroupePerUser;
  Int: Scalars['Int'];
  ArgsGroupe: ArgsGroupe;
  String: Scalars['String'];
  ArgsMessageChat: ArgsMessageChat;
  AuthPayLoad: AuthPayLoad;
  DateTime: Scalars['DateTime'];
  File: File;
  Groupe: Groupe;
  IdUser: IdUser;
  LoginAuthReturn: LoginAuthReturn;
  Message: Message;
  MessageChat: MessageChat;
  Boolean: Scalars['Boolean'];
  MessageInput: MessageInput;
  Mutation: {};
  Post: Post;
  PostCreateInput: PostCreateInput;
  PostOrderByUpdatedAtInput: PostOrderByUpdatedAtInput;
  Query: {};
  ReturnGroupe: ReturnGroupe;
  Upload: Scalars['Upload'];
  User: User;
  UserCreateInput: UserCreateInput;
  UserLoginInput: UserLoginInput;
  UserUniqueInput: UserUniqueInput;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayLoadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayLoad'] = ResolversParentTypes['AuthPayLoad']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Groupe'] = ResolversParentTypes['Groupe']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['ReturnGroupe']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginAuthReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginAuthReturn'] = ResolversParentTypes['LoginAuthReturn']> = {
  theUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageChat'] = ResolversParentTypes['MessageChat']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  mine?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDraft?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreateDraftArgs, 'authorEmail' | 'data'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  incrementPostViewCount?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationIncrementPostViewCountArgs, 'id'>>;
  signupUser?: Resolver<ResolversTypes['AuthPayLoad'], ParentType, ContextType, RequireFields<MutationSignupUserArgs, 'data'>>;
  togglePublishPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationTogglePublishPostArgs, 'id'>>;
  loginUser?: Resolver<ResolversTypes['LoginAuthReturn'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, never>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isLogged?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'data'>>;
  createGroupe?: Resolver<ResolversTypes['Groupe'], ParentType, ContextType, RequireFields<MutationCreateGroupeArgs, 'data'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  draftsByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<QueryDraftsByUserArgs, 'userUniqueInput'>>;
  feed?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryFeedArgs, never>>;
  postById?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostByIdArgs, never>>;
  message?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  messageByUser?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageByUserArgs, 'data'>>;
  getChat?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryGetChatArgs, 'data'>>;
  allUsersMessageByMe?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryAllUsersMessageByMeArgs, 'data'>>;
  allGroupe?: Resolver<Array<ResolversTypes['Groupe']>, ParentType, ContextType>;
  allGroupeByUser?: Resolver<Array<ResolversTypes['Groupe']>, ParentType, ContextType, RequireFields<QueryAllGroupeByUserArgs, 'data'>>;
};

export type ReturnGroupeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnGroupe'] = ResolversParentTypes['ReturnGroupe']> = {
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  groupeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayLoad?: AuthPayLoadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  Groupe?: GroupeResolvers<ContextType>;
  LoginAuthReturn?: LoginAuthReturnResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageChat?: MessageChatResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReturnGroupe?: ReturnGroupeResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
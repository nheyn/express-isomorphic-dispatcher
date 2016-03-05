declare module "isomorphic-dispatcher" {
  declare function createServerFactory(stores: StoresObject, onServerArg: any): DispatcherFactory;
  declare function createClientFactory(stores: StoresObject, finishOnServer: FinishOnServerFunc): DispatcherFactory;
  declare function createStore<S>(initialState: S): Store<S>;
}

declare class DispatcherFactory {
  getInitialDispatcher(): Dispatcher;
  getDispatcherAfter(actions: Array<Action>, startingPoints?: StartingPoints): Promise<Dispatcher>;
}

declare class Dispatcher {

}

declare class Store<S> {

}

type StatesObject = {[keys: string]: any};
type StoresObject = {[key: string]: Store<any>};
type StartingPoint<S> = { state: S, index: number };
type StartingPoints = {[key: string]: StartingPoint<any>};
type Action = Object;
type FinishOnServerFunc = (startingPoints: StartingPoints, actions: Array<Action>) => any;
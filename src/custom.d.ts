declare module '*.zip' {
  const content: any

  export default content
}

type Reducer<State, Action> = (state: State, action: Action) => State

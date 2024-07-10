import React, { ChangeEvent } from 'react'
import Input, { InputProps } from './Input'
import SearchButton, { ButtonProps } from './SearchButton'
import fetchData, { defaultURL, setLocalStorage } from './../utils'
import CardsContainer from './CardsContainer'
import ErrorBoundary from './ErrorBoundary'
import ErrorButton from './ErrorButton'

export type ApiData = {
  query?: string
  results?: []
}
export default class Page extends React.Component<ApiData> {
  state: {
    query?: string
    results?: []
    apiData?: object
    loading: boolean
  }

  constructor(props: ApiData) {
    super(props)
    this.state = { query: '', loading: true }
  }

  updateState(searchString?: string) {
    this.setState({ query: searchString })
  }
  async fetchData() {
    this.setState({ loading: true })
    const data = await fetchData()
    this.setState({
      apiData: data,
    })
    this.setState({ loading: false })
  }

  async componentDidMount() {
    if (localStorage.getItem('pokemonQuery')) {
      this.setState({ query: localStorage.getItem('pokemonQuery') })
    }
    this.fetchData()
  }

  async handleClick() {
    this.setState({ loading: true })
    if (this.state.query) {
      setLocalStorage(this.state.query)
      const data = await fetchData(defaultURL + this.state.query)
      this.setState({
        apiData: data,
      })
    } else {
      setLocalStorage('')
      this.fetchData()
    }
    this.setState({ loading: false })
  }

  render() {
    const props: ButtonProps = {
      callback: () => this.handleClick(),
    }
    const inputProps: InputProps = {
      initialState: this.state.query,
      callback: (e: ChangeEvent) => {
        if (e?.target instanceof HTMLInputElement)
          this.updateState(e.target.value)
      },
    }

    return (
      <main>
        <section>
          <Input {...inputProps} />
          <SearchButton {...props} />
          <ErrorButton />
        </section>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <section>
            {this.state.apiData && (
              <CardsContainer
                isLoading={this.state.loading}
                query={this.state.query ? this.state.query : ''}
                apiData={this.state.apiData}
              />
            )}
          </section>
        </ErrorBoundary>
      </main>
    )
  }
}

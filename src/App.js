import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "John Doe",
      },
      counter: 1,
      client: {
        isLoading: false,
        data: [],
      },
      response: {
        error: null,
        isLoading: false,
        data: [],
      },
    };
    console.log(this.state, "this.state");
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1,
      apiResponse: [...Array(4)],
    });
  };

  handleFetch = () => {
    this.setState({ client: { ...this.state.client, isLoading: true } });
    setTimeout(() => {
      this.setState({
        client: {
          ...this.state.client,
          data: ["User 1", "User 2", "User 3"],
          isLoading: false,
        },
      });
    }, 3000);
  };

  fetchdata = () => {
    console.log("fetch data");
    if (
      !this.state.response.isLoading &&
      this.state.response.data.length !== 0
    ) {
      return;
    }
    this.setState({
      response: {
        ...this.state.response,
        isLoading: true,
        error: null,
      },
    });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        // this.setState({ client: { ...this.state.response,  isLoading: false,
        //   data: json, } });
        this.setState({
          response: {
            ...this.state.response,
            data: json,
            isLoading: false,
            error: null,
          },
        });

        console.log(json, "json api call");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // this.setState({
        //   response: { ...this.state.response, isLoading: false },
        // });
        this.setState({
          response: {
            ...this.state.response,
            isLoading: true,
            error: "Error",
          },
        });
      });
  };
  render() {
    const { error, isLoading, data } = this.state.response;
    console.log(isLoading, "responseData");

    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <button onClick={this.handleClick}>Click - {this.state.counter}</button>
        <button onClick={this.handleFetch}>Fetch</button>
        <div>
          {this.state.client.isLoading ? (
            <p>Loading...</p>
          ) : (
            this.state.client.data
          )}
        </div>
        <button onClick={this.fetchdata}>view</button>
        <div>
          {isLoading ? <p>Loading...</p> : !isLoading}

          {Array.isArray(data) && data && data.length !== 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((res) => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.name}</td>
                    <td>{res.phone}</td>
                    <td>{res.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>} 

        </div>
      </div>
    );
  }
}

export default App;
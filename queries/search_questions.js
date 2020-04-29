// @TODO(vy): Replace with API fetch, instead of dummy data here.

const DUMMY_DATA = {
  posts: [
    {
      id: 1,
      title: 'Emmert suppot?',
      body:
        'I would like to use Emmet on repl.it for html, ejs, erb and other templating systems.',
      voteCount: 15,
      accepted: true,
      createdAt: '2020-04-07T05:16:37.835Z',
    },
    {
      id: 2,
      title: 'Suppot for Emmit',
      body:
        'Emmet is actually essential for me since I am not a fast typer as it is. So please support this! It will greatly increase my workflow.',
      voteCount: 1,
      createdAt: '2020-04-11T11:45:25.835Z',
    },
    {
      id: 3,
      title: 'How to upgrade Node?',
      body:
        'please update the node version as i cannot use some features with the discord.js library. the current version is way out of date.',
      voteCount: 0,
      createdAt: '2020-04-10T17:16:37.835Z',
    },
    {
      id: 4,
      title: 'please  upgrade Node!',
      body:
        'please update the node version as i cannot use some features with the discord.js library. the current version is way out of date.',
      accepted: true,
      voteCount: 21,
      createdAt: '2020-04-11T19:40:37.835Z',
    },
    {
      id: 5,
      title: 'Upgrade Account with PayPal or Crypto',
      body: 'PayPal or crypto payments optins would be nice',
      voteCount: 3,
      createdAt: '2020-04-14T00:28:37.835Z',
    },
    {
      id: 6,
      title: 'Can I pay with PayPal to upgrade my account?',
      body: "I don't have access to a credit card. ",
      voteCount: 12,
      accepted: true,
      createdAt: '2020-04-12T19:40:37.835Z',
    },
  ],
}

const SearchQuestions = (text, abortController) => {
  //  @TODO(vy): Manual override for simulating network errors.
  if (Math.random() < 0.05) {
    return Promise.reject()
  }

  return fetch('https://search-api.moudy.repl.co', {
    signal: AbortController.signal,
  }).then((response) => response.json())
}

export default SearchQuestions

function createCard(user) {
  const html = `
    <img src="${user.avatarUrl}" alt="${user.name}"/>
    <div>
      <h2>${user.name}</h2>
      <span>${user.email}</span>
    </div>
  `
  return html
}

fetch('https://randomuser.me/api/?page=1&results=9&seed=a')
  .then(result => result.json())
  .then(data => {
    const users = data.results.map(item => ({
      name: `${item.name.first} ${item.name.last}`,
      email: item.email,
      avatarUrl: item.picture.large
    }));

    if (users.length > 0) {
      const cardsContainer = document.getElementById('cards');
      users.forEach(user => {
        const cardElement = document.createElement('article');
        cardElement.className = 'card'
        cardElement.innerHTML = createCard(user);
        cardsContainer.appendChild(cardElement);
      });
    }
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
    document.getElementById('cards').innerHTML = '<p>Erro ao carregar os usuários. Tente novamente mais tarde.</p>';
  });

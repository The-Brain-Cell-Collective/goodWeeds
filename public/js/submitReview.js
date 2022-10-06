// const { text } = require("express");


// ***** Submit Review Functionality *****
console.log('connected');

const tag = document.getElementsByTagName('option');
console.log(tag);

async function reviewSubmit(event) {
  event.preventDefault();

  const revTitle = document.querySelector('#title').value;
  console.log(revTitle);

  const strainId = Number(document.querySelector('#strains').value);
    console.log(strainId);

  const userReview = document.querySelector('#content').value;
    console.log(userReview);

  const optionValue = document.querySelector('#strains');
  const optionText = optionValue.options[optionValue.selectedIndex].text;
    console.log(optionText)

  const response = await fetch(`/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      title: revTitle,
      strain_id: strainId,
      content: userReview,
      strain_name: optionText,
    }),
    headers: {
    'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    document.location.reload();
  } else {
    alert('failed to add review');
  }


}

document.querySelector('.postReview').addEventListener('submit', reviewSubmit);
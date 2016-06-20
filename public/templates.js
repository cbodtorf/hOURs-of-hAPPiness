var templates = {
  barSummary:
  `
  <div class='summary img-wrapper' data-id='<%= barId %>'>
    <img class="bar" src="<%= imageUrl %>" alt="" />
    <span> <%= barName %> </span>
  </div>
  `,
  barFullView:
  `
  <div class='fullView' data-id='<%= barId %>'>
    <img class="bar" src="<%= imageUrl %>" alt="" />
    <h3> <%= barName %> </h3>
    <span>Author: <%= author %></span>
  </div>
  `,
  review:
  `
  <div class='review' data-id='<%= reviewId %>'>
    <p> <%= review %> </p>
    <span> <%= rating %> </span>
    <span> <%= author %> </span>
  </div>
  `
}

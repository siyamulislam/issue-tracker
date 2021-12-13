document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(issues);
  // console.log(issues[0].id);
    //~~~~~~~~~~~~~~~ way-1 ~~~~~~~~~~~~~~~~
  // for (let i = 0; i < issues.length; i++) {
  //   if(issues[i].id==id){
  //     issues[i].status = 'Closed';
  //   }
  // }
  // localStorage.setItem('issues', JSON.stringify(issues));

  //~~~~~~~~~~~~~~~ way-2 ~~~~~~~~~~~~~~~~
  // const currentIssue = issues.find(issue => issue.id === id); 
  var currentIssue = issues.find( function (issue){
    return issue.id==id
  })
  currentIssue.status="Closed"
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
   const issues = JSON.parse(localStorage.getItem('issues'));

  //~~~~~~~~~~~~~~~ way-1 ~~~~~~~~~~~~~~~~
  // for (let i = 0; i < issues.length; i++) {
  //   if(issues[i].id==id){
  //     issues.splice(i,1)
  //   }
  // }
  // localStorage.setItem('issues', JSON.stringify(issues));

 //~~~~~~~~~~~~~~~ way-2 ~~~~~~~~~~~~~~~~
   //var remainingIssues = issues.filter( issues.id!== id )
   var remainingIssues = issues.filter( function (issue){
     return issue.id!=id
   })
   localStorage.setItem('issues', JSON.stringify(remainingIssues));

   fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  totalIssues=issues.length
  if(totalIssues<10){
    totalIssues="0"+totalIssues
  }
  document.getElementById("totalIssue").innerText=totalIssues
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    // let statusBG="label-info"
    // if(status=="Closed"){
    //   statusBG="label-success"
    // }

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label ${status=="Closed"? "label-success":"label-info"}"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}

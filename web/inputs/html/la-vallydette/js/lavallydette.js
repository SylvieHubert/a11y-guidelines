
function initVallydette (referentiel) {
	
	const jsonVallydette = 'json/lavallydette.json';
	const jsonRGAA = 'json/criteres-rgaa4.json';
	const jsonChecklistExpert = 'json/criteres-checklist-expert.json';
	const jsonIncontournables = 'json/criteres-incontournables.json';
	const jsonConcepteur = 'json/criteres-checklist-concepteur.json';
	const jsonWcagEase = 'json/criteres-wcag-ease.json';	
	
	//event handler
	document.getElementById('import').onclick = function() {
	  var files = document.getElementById('selectFiles').files;

	  var fr = new FileReader();
	  
	  fr.onload = function(e) { 
	  
		var result = JSON.parse(e.target.result);
		
		reqListener(e.target.result);
	
		//var formatted = JSON.stringify(result, null, 2);
		//document.getElementById('result').value = formatted;
	  }
	  
	 fr.readAsText(files.item(0));

	  //doXHR( fr.readAsText(files.item(0)));
	};
	
	//appel des Json
	doXHR(jsonVallydette, function(errFirst, responseFirst) {
	  if (errFirst) {
		reqError(); 
	  }
		return doXHR(jsonReferentiel, function(errSecond, responseSecond) {
			if (errSecond) {
			  reqError(); 
			}
			return reqListener(responseFirst, responseSecond, referentiel);
		  });
	});

	if (referentiel=='RGAA') {
		jsonReferentiel = jsonRGAA;
		btnRunRGAA.classList.add("active");
		btnRunExpert.classList.remove("active");
		btnRunIncontournables.classList.remove("active");
		btnRunConcepteur.classList.remove("active");
	} else if (referentiel=='expert') {
		jsonReferentiel = jsonChecklistExpert;
		btnRunExpert.classList.add("active");
		btnRunRGAA.classList.remove("active");
		btnRunIncontournables.classList.remove("active");
		btnRunConcepteur.classList.remove("active");
	} else if (referentiel=='incontournables' ) {
		jsonReferentiel = jsonIncontournables;
		btnRunRGAA.classList.remove("active");
		btnRunExpert.classList.remove("active");
		btnRunIncontournables.classList.add("active");
		btnRunConcepteur.classList.remove("active");
	} else if (referentiel=='concepteur' ) {
		jsonReferentiel = jsonConcepteur;
		btnRunRGAA.classList.remove("active");
		btnRunExpert.classList.remove("active");
		btnRunIncontournables.classList.remove("active");
		btnRunConcepteur.classList.add("active");
	} else if (referentiel=='wcagEase' ) {
		jsonReferentiel = jsonWcagEase;
	}
}

//requête XMLHttpRequest
function doXHR(url, callback) {
	var oReq = new XMLHttpRequest();

	  oReq.onreadystatechange = function(event) {
		if (this.readyState === XMLHttpRequest.DONE) {
		  if (this.status === 200) {
			return callback(null, this.responseText);
		  } else {
			return callback({errCode: this.status, errMsg: this.statusText});
		  }
		}
	  };
	  oReq.open('GET', url, true);
	  oReq.send(null);
}
	
function reqError(err) {
	let elrefTests = document.getElementById('refTests');
	elrefTests.innerHTML = '<div class="alert alert-warning">Erreur chargement ressource JSON</div>';
}
	
function formatHeading(str){
	str = str.toLowerCase();
	str = str.replace(/é|è|ê/g,"e");
	str = str.replace(/ /g,"-");
	
	return str;
}
	
function slugify(str) {
	return str.toString().toLowerCase()
    .replace(/(\w)\'/g, '$1')           // Special case for apostrophes
    .replace(/[^a-z0-9_\-]+/g, '-')     // Replace all non-word chars with -
    .replace(/\-\-+/g, '-')             // Replace multiple - with single -
    .replace(/^-+/, '')                 // Trim - from start of text
    .replace(/-+$/, ''); 
}
	
//supprimer les doublons dans les filtres
function delDoublon(arrCond, inputId){
	for (var i = 0; i < arrCond.length; i++) {
	//for (let condition of arrCond) {
		let condition = arrCond[i];
		if (condition.name == inputId) {
			let arrCondIndex = arrCond.indexOf(condition);
			arrCond.splice(arrCondIndex , 1);	
		}
	}
	return arrCond;
}


function importRGAA(dataVallydette, dataRGAA) {
	
	dataVallydette.checklist.name = "Audit RGAA 4";
	dataVallydette.checklist.referentiel = "RGAA";
	
	dataRGAA.topics.forEach(function(topics){
  
		topics.criteria.forEach(function(criteria){
		    
				 for (let test of Object.keys(criteria.criterium.tests)) {
					var testContent = criteria.criterium.tests[test];
					
					let vallydetteTest = {};
					
					//propriétés obligatoires
					vallydetteTest.ID = "testID-"+topics.number+"-"+criteria.criterium.number+"-"+test;
					vallydetteTest.commentaire = "";
					vallydetteTest.resultatTest = "";
					
					
					vallydetteTest.themes = topics.topic;
					vallydetteTest.criterium = criteria.criterium.title;
					
					if (Array.isArray(criteria.criterium.tests[test])) {
						vallydetteTest.title = criteria.criterium.tests[test][0];
						vallydetteTest.verifier = [];
	
						for (let verify in criteria.criterium.tests[test]) {
							
							if(verify!=0){
								vallydetteTest.verifier.push(criteria.criterium.tests[test][verify]);	
							}
						}
					} else {
						vallydetteTest.title = criteria.criterium.tests[test];
					}
					
					vallydetteTest.technicalNote = [];
					for (let note in criteria.criterium.technicalNote) {
						vallydetteTest.technicalNote.push(criteria.criterium.technicalNote[note]);	
					}
					
					vallydetteTest.wcag = [];
					for (let rules in criteria.criterium.references[0].wcag) {
						vallydetteTest.wcag.push(criteria.criterium.references[0].wcag[rules]);	
					}
					
					dataVallydette.checklist.page[0].items.push(vallydetteTest);
					
				}
  
		  
		});
		  
 
	});
	
return dataVallydette;

}

function importChecklistExpert(dataVallydette, dataChecklistExpert) {
	
	dataVallydette.checklist.name = "Audit Checklist Expert";
	dataVallydette.checklist.referentiel = "expert";
	dataVallydette.checklist.page[0].items = dataVallydette.checklist.page[0].items.concat(dataChecklistExpert.items);
		
return dataVallydette;

}

function importIncontournables(dataVallydette, dataChecklistExpert) {
	
	dataVallydette.checklist.name = "Audit Incontournables";
	dataVallydette.checklist.referentiel = "incontournables";
	dataVallydette.checklist.page[0].items = dataVallydette.checklist.page[0].items.concat(dataChecklistExpert.items);
		
return dataVallydette;

}

function importConcepteur(dataVallydette, dataChecklistExpert) {
	
	dataVallydette.checklist.name = "Audit Concepteur";
	dataVallydette.checklist.referentiel = "concepteur";
	dataVallydette.checklist.page[0].items = dataVallydette.checklist.page[0].items.concat(dataChecklistExpert.items);
		
return dataVallydette;

}

function importWcagEase(dataVallydette, dataChecklistExpert) {
	
	dataVallydette.checklist.name = "Grille Audit Wcag 2.1 d'Orange";
	dataVallydette.checklist.referentiel = "wcagEase";
	dataVallydette.checklist.page[0].items = dataVallydette.checklist.page[0].items.concat(dataChecklistExpert.items);
		
return dataVallydette;

}


function initComputation(refData) {

	//initialisation matrice calcul wcag
	const matriceVallydette = 'json/matrice-wcag-ease.json';
	var matriceRequest = new XMLHttpRequest();
	var matriceWcag;
	
	matriceRequest.onreadystatechange = function(event) {
		if (this.readyState === XMLHttpRequest.DONE) {
			
			matriceWcag = JSON.parse(this.responseText);
			
			//eventHandler show result
			var btnShowResult = document.getElementById("btnShowResult");
			btnShowResult.addEventListener('click', function(){runFinalComputation(matriceWcag, refData)}, false);

		}
	  };
	  
	matriceRequest.open('GET', matriceVallydette);
	matriceRequest.send(null);

}


function runComputation(referentielMatrice, refData) {

	const ogMatrice = referentielMatrice;
	pagesResults = [];

	for (let i in refData.checklist.page) {
		
		pagesResults[i] = [];
		pagesResults[i].items = [];
		pagesResults[i].name = refData.checklist.page[i].name;
		
		for (let k in ogMatrice.items) {
				
				pagesResults[i].items[k] = {};
				pagesResults[i].items[k].wcag = ogMatrice.items[k].wcag;
				pagesResults[i].items[k].resultat = "nt";
				pagesResults[i].items[k].complete = true;
	
			for (let l in ogMatrice.items[k].tests) {
			
				for (let j in refData.checklist.page[i].items) {		

					if (ogMatrice.items[k].tests[l] == refData.checklist.page[i].items[j].IDorigin) {
					
						if (refData.checklist.page[i].items[j].resultatTest=="nt") {
							
							pagesResults[i].items[k].complete = false;
							
						} 
					
						if (pagesResults[i].items[k].resultat) {
							   if (refData.checklist.page[i].items[j].resultatTest=="ok") {
									
									pagesResults[i].items[k].resultat = true;

							   } else if (refData.checklist.page[i].items[j].resultatTest=="ko") {
								   
								   pagesResults[i].items[k].resultat = false;
								   
							   } else if ((refData.checklist.page[i].items[j].resultatTest=="na") && (pagesResults[i].items[k].resultat=="nt")) {
								   
								   pagesResults[i].items[k].resultat = "na";
								   
							   }
						}
						
					}	
				}	
				
				if (pagesResults[i].items[k].complete==false) {
							
					pagesResults[i].items[k].resultat = "nt";
							
				} 
			}
			
		}

	}

	return pagesResults;
}

function getNTtests(refData) {
	
	nbNTArray = {};
	var nbNTtests = 0;
	var nbNTtestsPage = 0;
	
	for (let k in refData.checklist.page) {

		for (let l in refData.checklist.page[k].items) {
			
			if (refData.checklist.page[k].items[l].resultatTest=="nt") {
							
				nbNTtests++;
				nbNTtestsPage++;
				
			} 
				
		}

		nbNTArray["page"+k] = nbNTtestsPage;
		nbNTtestsPage = 0;
	}

	nbNTArray.total = nbNTtests;

	
	return 	nbNTArray;
}


function runFinalComputation(referentielMatrice, refData) {
	
	pagesResultsArray = runComputation(referentielMatrice, refData);
	
	nbNTResultsArray = getNTtests(refData);
	
	var nbNT = nbNTResultsArray.total;

	var finalTotal = 0;
	var finalResult = 0;
	var finalPagesResults = [];
	var nbPage = 0;
	
	for (let i in pagesResultsArray) {
		
		var nbTrue = 0;
		var nbFalse = 0;
		var nbNA = 0;
		//var nbNT = 0;
		var nbTotal = 0;
		
		for (let j in pagesResultsArray[i].items) {
			
			if (pagesResultsArray[i].items[j].resultat == true) {	
				nbTrue++;
				nbTotal++;	
			} else if (pagesResultsArray[i].items[j].resultat == false) {
				nbFalse++;	
				nbTotal++;
			} else if (pagesResultsArray[i].items[j].resultat == 'na') {
				nbNA++;	
			} else if (pagesResultsArray[i].items[j].resultat == 'nt') {
				pagesResultsArray[i].complete = false;	
			} 
				
		}
		
		//pour le cas où tous les tests d'une page sont non-applicables
		if (nbTotal==0 && nbNA>0) {
			
			pagesResultsArray[i].result = "NA";
			
		} else {
			
			//pagesResultsArray[i].result = Math.round((nbTrue / nbTotal) * 100);
			
			pagesResultsArray[i].result = (nbTrue / nbTotal) * 100;
			
		}
		
	}
	
	for (let i in pagesResultsArray) {
		if (pagesResultsArray[i].result!="NA") {
			finalTotal = finalTotal + pagesResultsArray[i].result;
			nbPage = nbPage+1;
		}
	}
	
	finalResult = Math.round((finalTotal / nbPage));

	let htmlModal = '';
			 htmlModal = '<div id="modalResult" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="">';
			 htmlModal += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
			 htmlModal += '<div class="modal-content">';
			 htmlModal += '<div class="modal-header">';
			 htmlModal += '<h2>Résultat de conformité</h2>';
			 htmlModal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
			 htmlModal += '<span aria-hidden="true">&times;</span>';
			 htmlModal += '</button>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-body">';
			
			
			if (nbNT>=1) {
				//htmlModal += '<div class="alert alert-warning" role="alert"><span class="alert-icon"><span class="sr-only">Attention</span></span><p>Il reste '+nbNT+' tests non-testés, certains critères WCAG ne peuvent donc pas encore être évalués. Merci de traiter tous les tests pour afficher le résultat.</p></div>';
				htmlModal += '<h3>Résultat global : </h3>';
				htmlModal += '<p>Audit en cours.</p>';
			} 
			 else if (nbNT==0 && !isNaN(finalResult)) {
				htmlModal += '<h3>Résultat global : </h3>';
				htmlModal += '<span class="finalResult">'+finalResult+'%</span>';
			}
			 
			//if (nbNT==0) {
				htmlModal += '<h3>Résultat par pages : </h3>';
				htmlModal += '<ul>';
				for (let i in pagesResultsArray) {
					if (pagesResultsArray[i].complete == false) {
						htmlModal += '<li><strong>'+pagesResultsArray[i].name+' : </strong>en cours ('+nbNTResultsArray['page'+i]+' non-testé(s))</li>';
					} else {
						htmlModal += '<li><strong>'+pagesResultsArray[i].name+' : </strong>'+((typeof pagesResultsArray[i].result === 'number') ? pagesResultsArray[i].result.toFixed(2)+' %' : pagesResultsArray[i].result)+' </li>';
					}
				}
				htmlModal += '</ul>';
			//} 
			 
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-footer">';
			 htmlModal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
		
			// Parent element
			let elModal = document.getElementById('modal');
			elModal.innerHTML = htmlModal;
	
}

// fin calcul résultat	

	
function reqListener(responseFirst, responseCriteria, responseReferentiel) {
	
	if (responseCriteria) {
		if (responseReferentiel=='RGAA') {
			var data = importRGAA(JSON.parse(responseFirst), JSON.parse(responseCriteria));
		} else if (responseReferentiel=='expert'){
			var data = importChecklistExpert(JSON.parse(responseFirst), JSON.parse(responseCriteria));	
		} else if (responseReferentiel=='incontournables') {
			var data = importIncontournables(JSON.parse(responseFirst), JSON.parse(responseCriteria));	
		} else if (responseReferentiel=='concepteur') {
			var data = importConcepteur(JSON.parse(responseFirst), JSON.parse(responseCriteria));	
		} else if (responseReferentiel=='wcagEase') {
			var data = importWcagEase(JSON.parse(responseFirst), JSON.parse(responseCriteria));	
		}
	} else {
		var data = JSON.parse(responseFirst);
		responseReferentiel = data.checklist.referentiel;
	}
	//var dataCriteria = JSON.parse(responseCriteria);

	var currentPage = 0;
	var idPageIndex = 0;
	
	//importRGAA (data, dataCriteria);
	
	// Récupération des données
	var refPages = data.checklist;	
	var refTests = data.checklist.page[currentPage].items;
	//var refTests = dataCriteria;

	//init computation
	initComputation(data);
	
	var uniqueTypes = [];

	//class statut
	var statutClass = "badge-light";

	var checklistApp = new function() {
	  // Récupération des données
	  //this.refTests = refTests;
	  var textContent = {
		title1 : "Procédures",
		title2 : "A vérifier",
		title3 : "Résultats",
		title4 : "Justification",
		statut1 : "conforme",
		statut2 : "non-conforme",
		statut3 : "non-applicable",
		statut4 : "non-testé"
	  };
	
	 //init checklist name
	var btnChecklist = document.getElementById("btnChecklistName");
	btnChecklist.addEventListener('click', function(){checklistApp.setValue(btnChecklist.dataset.element, btnChecklist.dataset.property)}, false);
	
	var btnPage = document.getElementById("btnPageName");
	btnPage.addEventListener('click', function(){checklistApp.setValue(btnPage.dataset.element, btnPage.dataset.property, btnPage.dataset.secondaryElement)}, false);
	
	var HeadingChecklistName = document.getElementById("checklistName");
	HeadingChecklistName.innerText = data.checklist.name;
	
	var btndelPage = document.getElementById("btnDelPage");
	btndelPage.addEventListener('click', function(){checklistApp.setDeletePage(btnPage.dataset.element)}, false);											   
	
	
	
///////////////// multipage //////////////////////	

	this.paginationPage = function(pages){
		var getPages = pages.page;

		//init add button
		
		var pageElement = document.getElementById("pageManager");
		pageElement.innerHTML = "";
		
		var btnAddPage = document.createElement("button");
		btnAddPage.innerHTML = "Ajouter une page";
		btnAddPage.setAttribute('id', "btnAddPage");
		btnAddPage.classList.add("btn","btn-secondary","btn-sm","mr-1","mt-1");
		
		pageElement.appendChild(btnAddPage);
		btnAddPage.addEventListener('click', function(){checklistApp.addPage()}, false);
	
			for (let i in getPages) {

					//display pagination
					let newBtnPage = document.createElement("button");
					
					newBtnPage.innerHTML = getPages[i].name;
					newBtnPage.setAttribute('id', getPages[i].IDPage);
					newBtnPage.classList.add("btn","btn-secondary","btn-sm","mr-1","mt-1");
					//(i == 0) && (getPages.length==1) ? newBtnPage.classList.add("active") : "";
					(i == 0)  ? newBtnPage.classList.add("active") : "";
					pageElement.appendChild(newBtnPage);

					let thisNewBtn = document.getElementById(getPages[i].IDPage);
					thisNewBtn.addEventListener('click', function(){checklistApp.showPage(thisNewBtn.id)}, false);
					
					let btnDelPage = document.getElementById("btnDelPage");
					getPages.length>1 ? btnDelPage.disabled = false : btnDelPage.disabled = true;
	
			}
		
	}
		
		

	this.addPage = function(){

		var arr2 = JSON.parse(JSON.stringify(data.checklist.page[currentPage]));
		data.checklist.page.push(arr2);
		
		indexPage = data.checklist.page.length - 1;
		idPageIndex = idPageIndex + 1;
		
		var newIdPage = new Uint32Array(1);
		window.crypto.getRandomValues(newIdPage);

		newIdPage =  "pageID-"+newIdPage;
		
		var btnFirstPage = document.getElementById(data.checklist.page[0].IDPage);
		btnFirstPage.disabled = false;
		
		//a supprimer
		data.checklist.page[indexPage].IDPage = newIdPage;
		data.checklist.page[indexPage].name = "Nom de la page";
		data.checklist.page[indexPage].items.forEach(this.initNewPage);
		
		jsonStr = JSON.stringify(data);
		
		//display pagination
		var pageElement = document.getElementById("pageManager");
		var newBtnPage = document.createElement("button");
		
		newBtnPage.innerHTML = "Nom de la page";
		newBtnPage.setAttribute('id', newIdPage);
		newBtnPage.classList.add("btn","btn-secondary","btn-sm","mr-1","mt-1");
		pageElement.appendChild(newBtnPage);
		

		var thisNewBtn = document.getElementById(newIdPage);
		var currentIdPage = thisNewBtn.getAttribute('id');
		thisNewBtn.addEventListener('click', function(){checklistApp.showPage(currentIdPage)}, false);

		//enabled delete button
		var currentBtnDelPage = document.getElementById('btnDelPage');
		currentBtnDelPage.disabled = false;
		
		//reinit computation
		//initComputation(data);
	}	

	this.initNewPage = function(item) {
		item.ID = item.ID+'-p'+indexPage;
		item.resultatTest = 'nt';
		item.commentaire = '';
	}
	
	this.showPage = function(id) {		

		var index = data.checklist.page.findIndex(function(o) {
			return o.IDPage == id;
		})	
		
		currentPage = index;
		
		[x,y] = this.getIfFilter("types");
	
		if (x) {
			checklistApp.runFilter(y);
		} else {
			checklistApp.FetchAll(data.checklist.page[currentPage].items);
		}
		
		var currentBtnPageName = document.getElementById('btnPageName');
		currentBtnPageName.dataset.property = "checklist.page."+currentPage+".name";
		currentBtnPageName.dataset.secondaryElement = id;	
		
		var currentBtnDelPage = document.getElementById('btnDelPage');
		currentBtnDelPage.dataset.property = "checklist.page."+currentPage;
		currentBtnDelPage.dataset.pagination = id;
		
		var pagination = document.getElementById("pageManager");
		var lastBtnPagination = pagination.getElementsByClassName("active");
		lastBtnPagination[0] ? lastBtnPagination[0].classList.remove("active") : "";
		
		var currentBtnPagination = document.getElementById(data.checklist.page[currentPage].IDPage);
		currentBtnPagination.classList.add("active");

	}
	
	this.setDeletePage = function(targetElement) {
		
		 let htmlModal = '';
			 htmlModal = '<div id="modalDelete" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="">';
			 htmlModal += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
			 htmlModal += '<div class="modal-content">';
			 htmlModal += '<div class="modal-header">';
			 htmlModal += '<h5>Supprimer</h5>';
			 htmlModal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
			 htmlModal += '<span aria-hidden="true">&times;</span>';
			 htmlModal += '</button>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-body">';
			 htmlModal += 'Supprimer la page '+this.getValue(targetElement)+' ?';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-footer">';
			 htmlModal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>';
			 htmlModal += '<button type="button" id="deteleSaveBtn" data-dismiss="modal" class="btn btn-primary">Valider</button>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
		
			// Parent element
			let elModal = document.getElementById('modal');
			elModal.innerHTML = htmlModal;
		
			// Event handler 
			var deteleSaveBtn = document.getElementById("deteleSaveBtn");
			deteleSaveBtn.addEventListener('click', function(){checklistApp.deletePage(currentPage, targetElement)});
		
			
	}
	
	this.deletePage = function(currentPage, targetElement) {	
		//remove from data
		data.checklist.page.splice(currentPage,1);
		

		//remove from pagination
		var currentBtnDelPage = document.getElementById('btnDelPage');
		data.checklist.page.length==1 ? currentBtnDelPage.disabled = true : "";
		
		var paginationBtnId = currentBtnDelPage.dataset.pagination;
		var paginationBtn = document.getElementById(paginationBtnId);
		paginationBtn.remove();
		
		
		currentPage != 0 ? currentPage = currentPage-1 :"";
		
		//currentPage = currentPage-1;
		
		newPageId = data.checklist.page[currentPage].IDPage;
		this.showPage(newPageId);
		
		//on met à jour l'export
		this.jsonUpdate();
		
		//reinit computation
		initComputation(data);
	}
	
	this.getIfFilter = function(name) {
		const filters = document.querySelectorAll('[name="'+name+'"]');
		let found = false;
		let foundItem;
		filters.forEach(function(filterItem) {
		
			if(filterItem.checked) {
				found=true;
				foundItem = filterItem;
			} 

		});
		
		return [found,foundItem];
	}
	
	
///////////////// fin multipage //////////////////////	

	//on prédéfini le tableau de filtres
	var filtres = [["conforme","ok"], ["non-conforme","ko"], ["non-applicable","na"], ["non-testé","nt"]];

	  this.getStatutClass = function(lastResult) {

		if (lastResult == filtres[0][1]) {
			statutClass = "badge-success";
		} else if (lastResult == filtres[1][1]) {
			statutClass = "badge-danger";
		} else if (lastResult == filtres[2][1]) {
			statutClass = "badge-info";
		} else {
			statutClass = "badge-light";
		}
		return statutClass;
	 }

	 this.setStatutClass = function(lastResult) {

		if (lastResult == filtres[0][1]) {
			statutText = textContent.statut1;
		} else if (lastResult == filtres[1][1]) {
			statutText = textContent.statut2;
		} else if (lastResult == filtres[2][1]) {
			statutText = textContent.statut3;
		} else {
			statutText = textContent.statut4;
		}
		return statutText;
	 }

	 this.setStates = function(ele, targetId) {
		ele.parentNode.parentNode.classList.add("mystyle");
		
		for (let i in data.checklist.page[currentPage].items) {
			if (data.checklist.page[currentPage].items[i].ID == targetId) {
				lastResult = this.getStatutClass(data.checklist.page[currentPage].items[i].resultatTest);
				data.checklist.page[currentPage].items[i].resultatTest = ele.value;
			}	
		}
		
		//mise à jour de l'état du test
		testResult = document.getElementById("resultID-"+targetId+"");
		testResult.classList.remove(lastResult); 

		
		if (ele.value == filtres[0][1]) {
			testResult.innerText = textContent.statut1;
			statutClass = "badge-success";
		} else if (ele.value == filtres[1][1]) {
			testResult.innerText = textContent.statut2;
			statutClass = "badge-danger";
		} else if (ele.value == filtres[2][1]) {
			testResult.innerText = textContent.statut3;
			statutClass = "badge-info";
		} else {
			testResult.innerText = textContent.statut4;
			statutClass = "badge-light";
		}
		
		testResult.classList.add(statutClass); 
	
		//on met à jour l'export
		this.jsonUpdate();
	
	}

	///////////Edition manager/////////////////
		this.setValue = function(targetElement, targetProperty, targetSecondaryElement) {
	
				let htmlModal = '';
				 htmlModal = '<div id="modalEdit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle">';
				 htmlModal += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
				 htmlModal += '<div class="modal-content">';
				 htmlModal += '<div class="modal-header">';
				 htmlModal += '<h5 class="modal-title" id="modalChecklistTitle">Modifier le nom de : '+this.getValue(targetElement)+'</h5>';
				 htmlModal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
				 htmlModal += '<span aria-hidden="true">&times;</span>';
				 htmlModal += '</button>';
				 htmlModal += '</div>';
				 htmlModal += '<div class="modal-body">';
				 htmlModal += '<input type="text" id="inputValue" aria-labelledby="modalChecklistTitle" value="'+this.getValue(targetElement)+'">';
				 htmlModal += '</div>';
				 htmlModal += '<div class="modal-footer">';
				 htmlModal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>';
				 htmlModal += '<button type="button" id="saveValueBtn" data-dismiss="modal" class="btn btn-primary">Enregistrer</button>';
				 htmlModal += '</div>';
				 htmlModal += '</div>';
				 htmlModal += '</div>';
				 htmlModal += '</div>';
		
			// Parent element
			let elModal = document.getElementById('modal');
			elModal.innerHTML = htmlModal;
			
			// Event handler 
			var saveValueBtn = document.getElementById("saveValueBtn");
			var targetInput = document.getElementById("inputValue");
			saveValueBtn.addEventListener('click', function(){checklistApp.updateValue(targetInput.value, targetElement, targetProperty, targetSecondaryElement)});

		}
	 
		this.updateValue = function(inputValue, targetElement, targetProperty, targetSecondaryElement) {	
			
			function setToValue(obj, value, path) {
				path = path.split('.');
				
				for (i = 0; i < path.length - 1; i++) {
					obj = obj[path[i]];
					
				}
				obj[path[i]] = value;
			}

			if(inputValue) {
				var currentTargetElement = document.getElementById(targetElement);
				currentTargetElement.innerText = inputValue;

				//data.checklist[targetProperty] = name;	
				setToValue(data, inputValue, targetProperty);
				
				if (targetSecondaryElement) {
					var currentTargetSecondaryElement = document.getElementById(targetSecondaryElement);
					currentTargetSecondaryElement.innerText = inputValue;					
				}
			}
			
			
			//on met à jour l'export
			this.jsonUpdate();
		}
	
		this.getValue = function(target) {	
				var targetElement = document.getElementById(target);
				return targetElement.innerText;	
		}
	
		
		///////////end edition manager/////////////////
	
		this.jsonUpdate = function() {
			let DefaultName = document.getElementById("checklistName");
			DefaultName = slugify(DefaultName.innerText);
	
			let dataStr = JSON.stringify(data);
			
			let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
			
			var todayDate = new Date();
			var date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
			
			var todayHour = new Date();
			var time = todayHour.getHours() + ":" + todayHour.getMinutes() + ":" + todayHour.getSeconds();
	
			let exportFileDefaultName = DefaultName+'-'+date+'-'+time+'.json';
	
			linkElement = document.getElementById("export");
			linkElement.classList.remove("disabled");
			linkElement.setAttribute('aria-disabled', false);
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', exportFileDefaultName);
		}
	
	
		//gestion commentaires
		this.setComment = function(targetId, title) {
		
		let titleModal = title;

			 let htmlModal = '';
			 htmlModal = '<div id="modal'+targetId+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle">';
			 htmlModal += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
			 htmlModal += '<div class="modal-content">';
			 htmlModal += '<div class="modal-header">';
			 htmlModal += '<h5 class="modal-title" id="modal'+targetId+'Title">Commentaire pour : '+titleModal+'</h5>';
			 htmlModal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
			 htmlModal += '<span aria-hidden="true">&times;</span>';
			 htmlModal += '</button>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-body">';
			 htmlModal += '<textArea id="comment'+targetId+'" aria-labelledby="modal'+targetId+'Title">'+this.getComment(targetId)+'</textArea>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-footer">';
			 htmlModal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>';
			 htmlModal += '<button type="button" id="commentSaveBtn" data-dismiss="modal" class="btn btn-primary">Enregistrer</button>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
 
			// Parent element
			let elModal = document.getElementById('modal');
			elModal.innerHTML = htmlModal;

			// Event handler
			var commentSave = document.getElementById("commentSaveBtn");
			var comment = document.getElementById('comment'+targetId);
			commentSave.addEventListener('click', function(){checklistApp.addComment(targetId, comment.value)});
			
		}
	
		this.addComment = function(targetId, newComment) {
			for (let i in data.checklist.page[currentPage].items) {
				if (data.checklist.page[currentPage].items[i].ID == targetId) {
					data.checklist.page[currentPage].items[i].commentaire = newComment;
				}	
			}
			
			var currentBtnComment = document.getElementById("commentBtn"+targetId);
			currentBtnComment.innerHTML = this.getCommentState(targetId);
			
			//on met à jour l'export
			this.jsonUpdate();
		}	

		this.getComment = function(targetId) {
			var currentComment;
			
			for (let i in data.checklist.page[currentPage].items) {
				if (data.checklist.page[currentPage].items[i].ID == targetId) {
					currentComment = data.checklist.page[currentPage].items[i].commentaire;
				}	
			}

			return (currentComment != "" ? currentComment : "");
		}	

		this.getCommentState = function(targetId) {
			var currentComment;
			
			for (let i in data.checklist.page[currentPage].items) {
				if (data.checklist.page[currentPage].items[i].ID == targetId) {
					currentComment = data.checklist.page[currentPage].items[i].commentaire;
				}	
			}

			return (currentComment == "" ? "Ajouter un commentaire <span class='icon-Comments' aria-hidden=\"true\"></span>" : "Modifier le commentaire <span class='icon-Comments text-primary' aria-hidden=\"true\"></span>");
		}	

		this.setCommentState = function(targetId) {
			var currentBtnComment = document.getElementById("commentBtn"+targetId);
			
		}	

		//fin gestion commentaires
		
	  this.UpdateTypes = function(allTypes, updatedTypes) {
		let elrefTypes = [];
		  
			for (let i in updatedTypes) {
				for (let j in updatedTypes[i].type) {
				  elrefTypes.push(updatedTypes[i].type[j]);
				}
			  }
			 let uniqueUpdatedTypes =  elrefTypes.filter(function(value, index, self) {
				return self.indexOf(value) === index; 
				});
		
			for (let i in allTypes) {	
						var elem = document.getElementById('type'+i);
						elem.disabled = true;
						var elemLabel = document.getElementById('labelType'+i);
						elemLabel.classList.add("disabled");
						
			  }	
			for (let i in allTypes) {
				for (let j in uniqueUpdatedTypes) {
				  if (allTypes[i]==uniqueUpdatedTypes[j]) {
						var elem = document.getElementById('type'+i);
						elem.disabled = false;
						var elemLabel = document.getElementById('labelType'+i);
						elemLabel.classList.remove("disabled");
				  }
				}
			  }
				
	  };
	  
	  this.UpdateFeedback = function(activeFilter, nbTests) {
		let elBtnReinit = document.getElementById('reinit');
		let elFeedback = document.getElementById('feedback');
		let htmlFeedback = '';
		if (activeFilter) {
			elBtnReinit.disabled = false;
			htmlFeedback = '<p><span><b>'+nbTests+'</b> tests dans filtres en cours</span></p>';
			elFeedback.innerHTML = htmlFeedback;
			
			/* let elreinitLink = document.getElementById('reinitLink');
			 elreinitLink.addEventListener('click', function() {
									
				checklistApp.runFilter();
				checklistApp.UpdateFeedback(false, refTests.length);
				
				
				//reinitialisation du filtre en cours de sélection
				var elToReinit = document.querySelector("#types input:checked");
				elToReinit.checked = false;
			 }); */
			 
			 
		} else {
			elBtnReinit.disabled = true;
			htmlFeedback = '<p><b>'+nbTests+'</b> tests en cours</p>';
			elFeedback.innerHTML = htmlFeedback;
		}
				
	  };
	  
	  this.FetchAll = function(currentRefTests) {
	 
		  // Selection de l'élément

		  let elrefTests = document.getElementById('refTests');
		  //elrefTests.classList.remove("accordion");
		   
		  let htmlrefTests = '';
		  let headingTheme = '';
		  let headingCriterium = '';
		  let nextIndex = 1;
		  
		  // TEMPLATE
		 
	     if(responseReferentiel=='wcagEase') {
			 
			 
				var currentPageName = document.getElementById('pageName');
				currentPageName.innerHTML = data.checklist.page[currentPage].name;
			 
			  //on boucle dans le tableau passé en paramètre de la fonction
			  for (let i in currentRefTests) {
				if(headingTheme!=currentRefTests[i].themes){
					headingTheme=currentRefTests[i].themes;
					htmlrefTests +='<h2 id="test-'+formatHeading(currentRefTests[i].themes)+'">'+currentRefTests[i].themes+'</h2>';
				}
				
				htmlrefTests += '<article class="" id="'+currentRefTests[i].ID+'"><div class="card-header" id="heading'+i+'"><h3 class="card-title"><a class="" role="button" data-toggle="collapse" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><span id="title-'+currentRefTests[i].ID+'" class="accordion-title">' + currentRefTests[i].title + '</span> <span id="resultID-'+currentRefTests[i].ID+'" class="badge badge-pill float-lg-right '+this.getStatutClass(currentRefTests[i].resultatTest)+'">'+ this.setStatutClass(currentRefTests[i].resultatTest)+'</span></a></h3>';
				//à remplacer par un for sur filtres
				
				htmlrefTests += '<div class="testForm"><ul class="list-inline"><li class="list-inline-item"><label for="conforme'+i+'">Conforme</label><input type="radio" id="conforme'+i+'" name="test'+i+'" value="ok" '+((currentRefTests[i].resultatTest == filtres[0][1]) ? "checked" : "")+'/></li><li class="list-inline-item"><label for="non-conforme'+i+'">Non conforme</label><input type="radio" id="non-conforme'+i+'" name="test'+i+'" id="radio'+i+'" value="ko" '+((currentRefTests[i].resultatTest == filtres[1][1]) ? "checked" : "")+'/></li><li class="list-inline-item"><label for="na'+i+'">N/A</label><input type="radio" id="na'+i+'" name="test'+i+'" value="na" '+((currentRefTests[i].resultatTest == filtres[2][1]) ? "checked" : "")+'/></li><li class="list-inline-item"><label for="nt'+i+'">Non testé</label><input type="radio" id="nt'+i+'" name="test'+i+'" value="nt" '+(((currentRefTests[i].resultatTest == filtres[3][1]) || (currentRefTests[i].resultatTest == '')) ? "checked" : "")+'/></li></ul>';
				
				htmlrefTests += '<button type="button" id="commentBtn'+currentRefTests[i].ID+'" class="btn btn-secondary float-lg-right" aria-labelledby="commentBtn'+currentRefTests[i].ID+' title-'+currentRefTests[i].ID+'" data-toggle="modal" data-target="#modal'+currentRefTests[i].ID+'">'+this.getCommentState(currentRefTests[i].ID)+'</button></div></div>';
				htmlrefTests += '<div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">';
				htmlrefTests += '<div class="card-block"><div class="row">';
				
				if (currentRefTests[i].verifier) {
					htmlrefTests += '<div class="col-lg-12"><h4>'+textContent.title2+'</h4>';
					htmlrefTests += currentRefTests[i].verifier;
					htmlrefTests += currentRefTests[i].complement;
					htmlrefTests += '</div></div>';
				}
				
				if (currentRefTests[i].exception) {
					htmlrefTests += '<div class="row"><div class="col-lg-12 mt-3" ><h4>Exceptions</h4>';
					htmlrefTests += '<p>' + currentRefTests[i].exception + '</p> ';
					htmlrefTests += '</div></div>';	
				}	
				
				htmlrefTests += '<div class="col-lg-12 card-footer text-muted"><p><b>Wcag : </b>';
				for (let j in currentRefTests[i].wcag) {
				  htmlrefTests += currentRefTests[i].wcag[j];
				  j != ((currentRefTests[i].wcag).length-1) ? htmlrefTests +=',  ' : '';
				}
				
				htmlrefTests += '</p></div>';
				htmlrefTests += '</div></article>';

			  } 
			 
		 } else if(responseReferentiel=='RGAA') {
			 
			 //test configuration rendu MARKED 
			// Get reference
			const renderer = new marked.Renderer();
			marked.setOptions({
			  renderer: renderer
			});

			// Override function link(string href, string title, string text)
			renderer.link = function (href, title, text) {
			  return text;
			};
			renderer.paragraph = function (text) {
			  return text;
			};
			// fin test marked
			 
			for (let i in currentRefTests) {
				if(headingTheme!=currentRefTests[i].themes){
					headingTheme=currentRefTests[i].themes;
					htmlrefTests +='<h2 id="test-'+formatHeading(currentRefTests[i].themes)+'">'+currentRefTests[i].themes+'</h2>';
				}
				
				if(headingCriterium!=currentRefTests[i].criterium){
					headingCriterium=currentRefTests[i].criterium;
					//htmlrefTests +='<h3>'+marked(currentRefTests[i].criterium)+'</h3>';
			

			htmlrefTests += '<article class="" id="'+currentRefTests[i].ID+'"><div class="card-header" id="heading'+i+'"><h3 class="card-title"><a class="" role="button" data-toggle="collapse" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><span class="accordion-title">' + currentRefTests[i].title + '</span><span id="resultID-'+currentRefTests[i].ID+'" class="badge badge-pill '+this.getStatutClass(currentRefTests[i].resultatTest)+' float-lg-right">'+ this.setStatutClass(currentRefTests[i].resultatTest)+'</span></a></h3>';
			//à remplacer par un for sur filtres
			//initialisation si aucun tests n'est checké
			if (currentRefTests[i].resultatTest == "") {
				currentRefTests[i].resultatTest = "nt";
				data.checklist.items[i].resultatTest = "nt";
			} 
			
			htmlrefTests += '<div class="testForm"><label for="conforme'+i+'">Conforme</label><input type="radio" id="conforme'+i+'" name="test'+i+'" value="ok" '+((currentRefTests[i].resultatTest == filtres[0][1]) ? "checked" : "")+'/> <label for="non-conforme'+i+'">Non conforme</label><input type="radio" id="non-conforme'+i+'" name="test'+i+'" id="radio'+i+'" value="ko" '+((currentRefTests[i].resultatTest == filtres[1][1]) ? "checked" : "")+'/>  <label for="na'+i+'">N/A</label><input type="radio" id="na'+i+'" name="test'+i+'" value="na" '+((currentRefTests[i].resultatTest == filtres[2][1]) ? "checked" : "")+'/>  <label for="nt'+i+'">Non testé</label><input type="radio" id="nt'+i+'" name="test'+i+'" value="nt" '+((currentRefTests[i].resultatTest == filtres[3][1]) ? "checked" : "")+'/>';
			htmlrefTests += '<button type="button" id="commentBtn'+i+'" class="btn btn-secondary float-lg-right" data-toggle="modal" data-target="#modal'+i+'">'+this.getCommentState(i)+'</button></div></div>';
			htmlrefTests += '<div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">';
			htmlrefTests += '<div class="card-block"><div class="row">';
			htmlrefTests += '<div class="col-lg-6"><h4>'+textContent.title1+'</h4><ol>';
			for (let j in currentRefTests[i].tests) {
				htmlrefTests += '<li>' + currentRefTests[i].tests[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '<div class="col-lg-6"><h4>'+textContent.title2+'</h4><ol>';
			for (let j in currentRefTests[i].verifier) {
				htmlrefTests += '<li>' +  currentRefTests[i].verifier[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '</div>';
			htmlrefTests += '<div class="row">';
			htmlrefTests += '<div class="col-lg-12"><h4>'+((currentRefTests[i].profils[0] == 'Concepteur') ? textContent.title4 : textContent.title3)+'</h4><ol>';
			for (let j in currentRefTests[i].resultat) {
				htmlrefTests += '<li>' + currentRefTests[i].resultat[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '</div>';
			if (currentRefTests[i].exception) {
				htmlrefTests += '<div class="row"><div class="col-lg-12" ><h4>Exceptions</h4>';
				htmlrefTests += '<p>' + currentRefTests[i].exception + '</p> ';

					htmlrefTests +='<div class="card-header"><h3><a class="collapsed" role="button" data-toggle="collapse" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'">'+marked(currentRefTests[i].criterium)+'</a></h3></div>';
					htmlrefTests +='<div id="collapse'+i+'" class="collapse">'; 
				}
				
				htmlrefTests += '<article class="mb-1" id="'+currentRefTests[i].ID+'"><div class="card-header" id="heading'+i+'"><span class="accordion-title">' + marked(currentRefTests[i].title) + '</span><span id="resultID-'+currentRefTests[i].ID+'" class="badge badge-pill '+this.getStatutClass(currentRefTests[i].resultatTest)+' float-lg-right">'+ this.setStatutClass(currentRefTests[i].resultatTest)+'</span>';
				//à remplacer par un for sur filtres
				
				htmlrefTests += '<div class="testForm"><label for="conforme'+i+'">Conforme</label><input type="radio" id="conforme'+i+'" name="test'+i+'" value="ok" '+((currentRefTests[i].resultatTest == filtres[0][1]) ? "checked" : "")+'/> <label for="non-conforme'+i+'">Non conforme</label><input type="radio" id="non-conforme'+i+'" name="test'+i+'" id="radio'+i+'" value="ko" '+((currentRefTests[i].resultatTest == filtres[1][1]) ? "checked" : "")+'/>  <label for="na'+i+'">N/A</label><input type="radio" id="na'+i+'" name="test'+i+'" value="na" '+((currentRefTests[i].resultatTest == filtres[2][1]) ? "checked" : "")+'/>  <label for="nt'+i+'">Non testé</label><input type="radio" id="nt'+i+'" name="test'+i+'" value="nt" '+(((currentRefTests[i].resultatTest == filtres[3][1]) || (currentRefTests[i].resultatTest == '')) ? "checked" : "")+'/>';
				
				htmlrefTests += '<button type="button" id="commentBtn'+i+'" class="btn btn-secondary float-lg-right" data-toggle="modal" data-target="#modal'+i+'">'+this.getCommentState(i)+'</button></div>';
				htmlrefTests += '</div></article>';
			
				if((currentRefTests[nextIndex]!=undefined)&&(headingCriterium!=currentRefTests[nextIndex].criterium)){
						htmlrefTests +='</div>';
				} 
				
				nextIndex = nextIndex+1;
	
			} 
		}		
	}	else {
			 
			  //on boucle dans le tableau passé en paramètre de la fonction
			  for (let i in currentRefTests) {
				if(headingTheme!=currentRefTests[i].themes){
					headingTheme=currentRefTests[i].themes;
					htmlrefTests +='<h2 id="test-'+formatHeading(currentRefTests[i].themes)+'">'+currentRefTests[i].themes+'</h2>';
				}
				
				htmlrefTests += '<article class="" id="'+currentRefTests[i].ID+'"><div class="card-header" id="heading'+i+'"><h3 class="card-title"><a class="" role="button" data-toggle="collapse" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><span class="accordion-title">' + currentRefTests[i].title + '</span><span id="resultID-'+currentRefTests[i].ID+'" class="badge badge-pill '+this.getStatutClass(currentRefTests[i].resultatTest)+' float-lg-right">'+ this.setStatutClass(currentRefTests[i].resultatTest)+'</span></a></h3>';
				//à remplacer par un for sur filtres
				
				htmlrefTests += '<div class="testForm"><label for="conforme'+i+'">Conforme</label><input type="radio" id="conforme'+i+'" name="test'+i+'" value="ok" '+((currentRefTests[i].resultatTest == filtres[0][1]) ? "checked" : "")+'/> <label for="non-conforme'+i+'">Non conforme</label><input type="radio" id="non-conforme'+i+'" name="test'+i+'" id="radio'+i+'" value="ko" '+((currentRefTests[i].resultatTest == filtres[1][1]) ? "checked" : "")+'/>  <label for="na'+i+'">N/A</label><input type="radio" id="na'+i+'" name="test'+i+'" value="na" '+((currentRefTests[i].resultatTest == filtres[2][1]) ? "checked" : "")+'/>  <label for="nt'+i+'">Non testé</label><input type="radio" id="nt'+i+'" name="test'+i+'" value="nt" '+(((currentRefTests[i].resultatTest == filtres[3][1]) || (currentRefTests[i].resultatTest == '')) ? "checked" : "")+'/>';
				
				htmlrefTests += '<button type="button" id="commentBtn'+i+'" class="btn btn-secondary float-lg-right" data-toggle="modal" data-target="#modal'+i+'">'+this.getCommentState(i)+'</button></div></div>';
				htmlrefTests += '<div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">';
				htmlrefTests += '<div class="card-block"><div class="row">';
				htmlrefTests += '<div class="col-lg-6"><h4>'+textContent.title1+'</h4><ol>';
				for (let j in currentRefTests[i].tests) {
					htmlrefTests += '<li>' + currentRefTests[i].tests[j] + '</li> ';
				}
				htmlrefTests += '</ol></div>';
				htmlrefTests += '<div class="col-lg-6"><h4>'+textContent.title2+'</h4><ol>';
				for (let j in currentRefTests[i].verifier) {
					htmlrefTests += '<li>' +  currentRefTests[i].verifier[j] + '</li> ';
				}
				htmlrefTests += '</ol></div>';
				htmlrefTests += '</div>';
				htmlrefTests += '<div class="row">';
				htmlrefTests += '<div class="col-lg-12"><h4>'+((currentRefTests[i].profils[0] == 'Concepteur') ? textContent.title4 : textContent.title3)+'</h4><ol>';
				for (let j in currentRefTests[i].resultat) {
					htmlrefTests += '<li>' + currentRefTests[i].resultat[j] + '</li> ';
				}
				htmlrefTests += '</ol></div>';
				htmlrefTests += '</div>';
				if (currentRefTests[i].exception) {
					htmlrefTests += '<div class="row"><div class="col-lg-12" ><h4>Exceptions</h4>';
					htmlrefTests += '<p>' + currentRefTests[i].exception + '</p> ';
					htmlrefTests += '</div>';
					htmlrefTests += '</div>';
				}		
				htmlrefTests += '</div><div class="card-footer text-muted"><b>Profils : </b>';
				for (let j in currentRefTests[i].profils) {
				  htmlrefTests += currentRefTests[i].profils[j];
				  j != ((currentRefTests[i].profils).length-1) ? htmlrefTests +=',  ' : '';
				}
				htmlrefTests += '<br />'+((currentRefTests[i].type).length > 0 ? '<b>Outils : </b>' : '');
				for (let j in currentRefTests[i].type) {
				  htmlrefTests += '<i class="fa fa-tag" aria-hidden="true"></i> ' + currentRefTests[i].type[j] + ' ';
				}
				htmlrefTests += '</div>';
				htmlrefTests += '</div></article>';

			  } 
		}
		 

			// Affichage de l'ensemble des lignes en HTML
			currentRefTests.length===0 ?  elrefTests.innerHTML = '<div class="alert alert-warning">Aucun résultat ne correspond à votre sélection</div>' : elrefTests.innerHTML = htmlrefTests;
	
			
			// Event Handler
			 for (let i in currentRefTests) {
				
				//radio
				var radios = document.getElementsByName("test"+i);
				var nodeArray = [];
				for (var j = 0; j < radios.length; ++j) {
					 radios[j].addEventListener('click', function(){checklistApp.setStates(this, currentRefTests[i].ID)}, false);
				}

				//commentaires
				var comment = document.getElementById("commentBtn"+currentRefTests[i].ID);
				comment.addEventListener('click', function(){checklistApp.setComment(currentRefTests[i].ID, currentRefTests[i].title)}, false);
			}  
			
		};
		
		
		// Retourne la liste des checkboxes
		this.DisplayFilters = function() {
		
			//debut gestion des boutons de reinitialisation
			  let elFilterFooter = document.getElementById('filter-footer');
			  let htmlFilterFooter = '';
			    
			  htmlFilterFooter += '<button id="reinit" class="btn btn-secondary" disabled>Réinitialiser</button>';
			  elFilterFooter.innerHTML = htmlFilterFooter;
			  
			  let elBtnReinit = document.getElementById('reinit');
			  
			 elBtnReinit.addEventListener('click', function() {
									
				checklistApp.runFilter();
				checklistApp.UpdateFeedback(false, refTests.length);
				
				//reinitialisation du filtre en cours de sélection
				var elToReinit = document.querySelector("#types input:checked");
				elToReinit.checked = false;
			 });
			//fin gestion des boutons de reinitialisation
			
			//debut ajout input de filtre
			  let htmlTypes = '';
			  let elTypes = document.getElementById('types');
			  elTypes.innerHTML = "";
			
			  for (let i in filtres) {
				htmlTypes = '<input type="radio" id="type' + i + '" name="types" value="' + filtres[i][1] + '"> <label for="type' + i + '" id="labelType' + i + '">' + filtres[i][0] + '</label>';
				var node = document.createElement("li");                 
				node.innerHTML = htmlTypes;               
				elTypes.appendChild(node);    

				var elRadio = document.getElementById("type"+i);
				elRadio.addEventListener('click', function(){checklistApp.runFilter(this)}, false);
				
			  }
			 //fin ajout input de filtre

		}
		
		this.runFilter = function(elRadio) {
		
					let runUpdateType = false;
					let conditions = [];
					let arrType    = [];
					if (elRadio && elRadio.checked){
						arrType = [];
						arrType.push(elRadio.value);
					}

					let indice = arrType.length;
						
					if (indice > 0) {	

						//on supprime les doublons, nécessaire pour les boutons radio
						delDoublon(conditions, elRadio.name);
					
						conditions.unshift(function(item) {
							return item.resultatTest.indexOf(arrType[0]) !== -1;
						});
						

						//on nomme la fonction, pour les checkboxes on utilise this.id
						Object.defineProperty(conditions[0], 'name', {value: elRadio.name, writable: false});	
								
						runUpdateType = false;

								
						//on applique tous les filtres stockés dans conditions
						 //filteredTest = self.refTests.filter(function(d) {
						filteredTest = data.checklist.page[currentPage].items.filter(function(d) {
							return conditions.every(function(c) {
								return c(d);
							});
						});		

						//on met à jour la page				
						checklistApp.FetchAll(filteredTest);
						
						if (runUpdateType) {
							checklistApp.UpdateTypes(uniqueTypes, filteredTest);
						}
						
						checklistApp.UpdateFeedback(true,filteredTest.length);
			
							
				 } else {
					//aucun critère de sélectionné, on réinitialise la page
					checklistApp.FetchAll(data.checklist.page[currentPage].items);
					
				 }
		}

}
	// Affichage de tous les tests
	checklistApp.FetchAll(refTests);
	checklistApp.paginationPage(refPages);
	// Affiche les checkboxes et boutons radios
	checklistApp.DisplayFilters();
	checklistApp.UpdateFeedback(false, refTests.length);
}

initVallydette('wcagEase');
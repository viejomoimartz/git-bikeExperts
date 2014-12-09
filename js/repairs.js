var gEntreeCount = 0;
function initialize(idTheTable,idXMLData)
{
	// get a reference to the table to populate
	var oTheTable = document.getElementById(idTheTable);
	
	// if the table already has a TBODY section, remove it
	// because we'll be creating a new one from scratch
	var theTBODY = oTheTable.getElementsByTagName('TBODY');
	if (theTBODY.length > 0)
		oTheTable.removeChild(theTBODY[0]);
		
	// now create the menu's content from the XML data. This function
	// will give us back a brand new TBODY to put into the table
	theTBODY = generateMenuContent(idXMLData);
	
	// add the new TBODY to the table
	oTheTable.appendChild(theTBODY);
}

function generateMenuContent(idXMLData)
{
	var i=0,j=0;
	// make a new empty TBODY section
	var theTBODYNode = document.createElement('TBODY');
	
	// find the XML data island in the document
	var oXMLDoc = document.getElementById(idXMLData);
	
	// now find each one of the SECTION tags in the XML and process
	// each one of them
	var aMenuSections = oXMLDoc.getElementsByTagName('section');
	for (i=0; i < aMenuSections.length; i++)
	{
		var sName = aMenuSections.item(i).getAttribute('name');
		var oTR = document.createElement('TR');
		var oTD = document.createElement('TD');
		oTD.setAttribute('colspan','3');
		oTD.appendChild(document.createTextNode(sName));
		oTR.appendChild(oTD);
		theTBODYNode.appendChild(oTR);
		
		var aEntrees = aMenuSections.item(i).getElementsByTagName('repair');
		for (j=0; j < aEntrees.length; j++)
		{
			oTR = document.createElement('TR');
            
			if (aEntrees.item(j).getAttribute("common"))
				oTR.setAttribute("common",aEntrees.item(j).getAttribute("common"));
				
			// create the TD for the checkbox
			oTD = document.createElement('TD');
			oTD.setAttribute('align','center');
			var oCB = document.createElement('INPUT');
			oCB.setAttribute('name','item' + gEntreeCount++);
			oCB.setAttribute('type','checkbox');
			oTD.appendChild(oCB);
			oTR.appendChild(oTD);
			
			// create the TD for the item name
			oTD = document.createElement('TD');
			var oItemNode = aEntrees.item(j).getElementsByTagName('item')[0];
			// just copy the item node's text child to the TD
			oTD.appendChild(document.createTextNode(oItemNode.firstChild.data));
			oTR.appendChild(oTD);
			
			// create the TD for the price
			oTD = document.createElement('TD');
			// align the prices to the right so they line up
			// over the decimal point
			oTD.setAttribute('align','right');
			var oPriceNode = aEntrees.item(j).getElementsByTagName('price')[0];
            oTD.appendChild(document.createTextNode(oPriceNode.firstChild.data));
			oTR.appendChild(oTD);

            theTBODYNode.appendChild(oTR);
		}
	}
	return theTBODYNode;
}

function calculateBill(idMenuTable)
{
	var fBillTotal = 0.0;
	var i=0;
    var tax = 1.075;
	
	// find the table tag
	var oTable = document.getElementById(idMenuTable);
	
	var aCBTags = oTable.getElementsByTagName('INPUT');
	for (i=0; i < aCBTags.length; i++)
	{
		// is this menu item selected? it is if the checkbox is checked
		if (aCBTags[i].checked)
		{
			// get the checkbox' parent table row
			var oTR = getParentTag(aCBTags[i],'TR');
			
			// retrieve the price from the price column, which is the third column in the table
			var oTDPrice = oTR.getElementsByTagName('TD')[2];
			// the first child text node of the column contains the price
			fBillTotal += parseFloat(oTDPrice.firstChild.data) * tax;
		}
	}
    
	return parseFloat(Math.round(fBillTotal*100)/100).toFixed(2);
}

function highlightCommon(idTable,bShowCommon)
{
	var i=0;
	var oTable = document.getElementById(idTable);

	var oTBODY = oTable.getElementsByTagName('TBODY')[0];
	var aTRs = oTBODY.getElementsByTagName('TR');

	for (i=0; i < aTRs.length; i++)
	{
		if (aTRs[i].getAttribute('common'))
		{
			if (bShowCommon)
				aTRs[i].style.backgroundColor = "lightGreen";
			else
				aTRs[i].style.backgroundColor = "";
		}
	}
}

function getParentTag(oNode, sParentType)
{
	var oParent = oNode.parentNode;
	while (oParent)
	{
		if (oParent.nodeName == sParentType)
			return oParent;
		oParent = oParent.parentNode;
	}
	return oParent;
}




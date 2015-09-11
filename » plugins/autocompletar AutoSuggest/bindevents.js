var fruits = new Array("Apple","Apricot","Banana","Blueberry","Blackberry","Cranbery","Crabapple","Cumquat","Date",
"Elderberry","Fig","Filbert","Gooseberry","Grapefruit","Grape","Guava","Honey Locust","Hilama","Imbu","India Date",
"Indian Prune","Indian Turnip","Juneberry","Kangaroo Apple","Lemon","Lime","Lingonberry","Mayan Breadnut","Nectarine",
"Orange","Papaya","Pear","Pineapple","Plum","Quinine","Raisin","Raspberry","Strawberry","Sugar Plum","Sour Apple",
"Tangerine","Tapioca","Ugli Fruit");


function bindEvents()
{
	//Find all of the INPUT tags
	var tags = document.getElementsByTagName('INPUT');
	for (i in tags)
	{
		var tag = tags[i];
		//If it's a text tag, attach an AutoSuggest object.
		if(tag.type && tag.type.toLowerCase() == "text")
		{
			new AutoSuggest(tag,fruits);
		}
	}
}


window.onload = bindEvents;
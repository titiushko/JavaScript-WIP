package es.com.blogspot.elblogdepicodev.todo.tapestry.pages;

import java.util.Collection;

import org.apache.tapestry5.ComponentResources;
import org.apache.tapestry5.SymbolConstants;
import org.apache.tapestry5.annotations.Property;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.apache.tapestry5.ioc.annotations.Symbol;
import org.apache.tapestry5.services.Request;

import com.google.gson.Gson;

import es.com.blogspot.elblogdepicodev.todo.rest.Tarea;
import es.com.blogspot.elblogdepicodev.todo.rest.TareasResource;

public class Index {

	@Inject
	@Symbol(SymbolConstants.TAPESTRY_VERSION)
	@Property
	private String tapestryVersion;	
	
	@Inject
	@Property
	private Request request;

	@Inject
	private ComponentResources resources;
	
	@Inject
	private TareasResource tareasResource;
	
	public String getTareasJSON() {
		Collection<Tarea> tareas = tareasResource.readTareas();
		return new Gson().toJson(tareas);
	}
	
	public String getLocale() {
		 if (request.getLocale().getCountry() == null || request.getLocale().getCountry().trim().isEmpty()) {
				 return String.format("%s", request.getLocale().getLanguage());			  
		 } else {
				 return String.format("%s-%s", request.getLocale().getLanguage(), request.getLocale().getCountry());			  
		 }
	}
}
package com.training.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.training.business.bean.MaterialTypeBean;
import com.training.service.MaterialTypeService;

@CrossOrigin("http://localhost:3001")
@RestController
public class MaterialTypeContoller {
	// TODO: Autowire MaterialTypeService object 
	@Autowired
	private MaterialTypeService materialTypeService;
	/* 
	 * TODO:
	 * Method - getTypeDetails();
	 * Fetch all the material types from MaterialTypeService and store it inside a List
	 * Return a ResponseEntity object passing the list of material types
	 * 
	 */
	@GetMapping(value="type/controller/getTypeDetails",produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MaterialTypeBean>> getTypeDetails(){
		List<MaterialTypeBean> materialTypes = materialTypeService.getMaterialTypes();
		return ResponseEntity.ok(materialTypes);
	}
	
	/* 
	 * TODO:
	 * Method - getTypesBasedOnCategoryId();
	 * Fetch all the material types using categoryId from MaterialTypeService and store it inside a List
	 * Return a ResponseEntity object passing the list of material types
	 * 
	 */
	@GetMapping(value="type/controller/getTypeDetailsByCategoryId/{categoryId}",produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MaterialTypeBean>> getTypesBasedOnCategoryId(@PathVariable("categoryId") String categoryId){
		List<MaterialTypeBean> materialTypes = materialTypeService.getMaterialTypesBasedOnCategoryId(categoryId);
		return ResponseEntity.ok(materialTypes);
	}

}

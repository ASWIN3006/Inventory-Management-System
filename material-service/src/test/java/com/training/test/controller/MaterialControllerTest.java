package com.training.test.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.training.controller.MaterialController;
import com.training.service.MaterialService;

@WebMvcTest(MaterialController.class)
public class MaterialControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(MaterialControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MaterialService materialServiceMock;

    @Test
    public void healthMaterialControllerTest() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/health"))
                .andExpect(status().isOk())
                .andExpect(content().string("Material Service is UP"));
    }

}
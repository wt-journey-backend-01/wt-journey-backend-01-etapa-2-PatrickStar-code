const express = require("express");
const agentesRepository = require("./agentesRepository");

/*
   {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" 
    
    }*/

const casosData = [];

function getAll({ agente_id, status }) {
  let result = [...casosData];

  if (agente_id) {
    result = result.filter((caso) => caso.agente_id === agente_id);
  }

  if (status) {
    result = result.filter((caso) => caso.status === status);
  }

  return result;
}

function search(query) {
  query = query.toLowerCase();
  console.log(query);
  const teste = casosData.filter((caso) => caso.titulo.includes(query));
  console.log(teste);
  return teste;
}

function findById(id) {
  return casosData.find((caso) => caso.id === id);
}

function create(caso) {
  casosData.push(caso);
  return caso;
}

function update(caso, id) {
  const index = casosData.findIndex((c) => c.id === id);
  if (index !== -1) {
    casosData[index] = { ...casosData[index], ...caso };
    return casosData[index];
  }
  return null;
}

function deleteCaso(id) {
  const index = casosData.findIndex((caso) => caso.id === id);
  if (index !== -1) {
    casosData.splice(index, 1);
  }
}

function getAgente(casoId) {
  const caso = casosData.find((c) => c.id === casoId);
  if (!caso) return null;
  return agentesRepository.findById(caso.agente_id);
}

function partialUpdate(id, caso) {
  const index = casosData.findIndex((caso) => caso.id === id);

  casosData[index] = { ...casosData[index], ...caso };
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteCaso,
  partialUpdate,
  getAgente,
  search,
};

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

function getAll({ agente_id, status } = {}) {
  let result = [...casosData];

  if (agente_id) {
    result = result.filter((caso) => caso.agente_id === agente_id);
  }

  if (status) {
    result = result.filter((caso) => caso.status === status);
  }

  return result;
}

function search(q) {
  const finded = casosData.filter(
    (caso) =>
      caso.titulo.toLowerCase().includes(q.toLowerCase()) ||
      caso.descricao.toLowerCase().includes(q.toLowerCase())
  );

  if (finded.length === 0) {
    return null;
  }
  return finded;
}

function create(caso) {
  casosData.push(caso);
  return caso;
}

function findById(id) {
  const casoFinded = casosData.find((caso) => caso.id === id);
  return casoFinded;
}

function update(id, caso) {
  const index = casosData.findIndex((c) => c.id === id);
  if (index !== -1) {
    const { id: _, ...dadosSemId } = caso;
    casosData[index] = { ...casosData[index], ...dadosSemId };
    return casosData[index];
  }
  return null;
}

function deleteCaso(id) {
  const index = casosData.findIndex((caso) => caso.id === id);
  if (index !== -1) {
    casosData.splice(index, 1);
    return true;
  }
  return false;
}

function patch(id, NewCaso) {
  const index = casosData.findIndex((caso) => caso.id === id);
  if (index !== -1) {
    casosData[index] = { ...casosData[index], ...NewCaso };
    return casosData[index];
  }
  return null;
}

module.exports = {
  getAll,
  search,
  create,
  findById,
  deleteCaso,
  update,
  patch,
};

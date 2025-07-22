const express = require("express");
const { v4: uuidv4 } = require("uuid");
/*
id: string (UUID) obrigatório.
nome: string obrigatório.
dataDeIncorporacao: string , no formato YYYY-MM-DDobrigatória.
cargo: ("inspetor", "delegado", etc.) obrigatório.
*/
const agentes = [];

function findAll({ cargo, sort } = {}) {
  let result = [...agentes];

  if (cargo) {
    result = result.filter((agente) => agente.cargo === cargo);
  }

  if (sort) {
    result.sort((a, b) => {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });
  }

  return result;
}

function findById(id) {
  return agentes.find((agente) => agente.id === id);
}

function create({ id, nome, dataDeIncorporacao, cargo }) {
  agentes.push({ id, nome, dataDeIncorporacao, cargo });
}

function deleteAgente(id) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agentes.splice(index);
}

function updateAgente(id, agente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agente.id = id;
  agentes[index] = agente;
}

function patchAgentes(id, agente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agentes[index] = { ...agentes[index], ...agente };
}

module.exports = {
  findAll,
  findById,
  create,
  deleteAgente,
  updateAgente,
  patchAgentes,
};

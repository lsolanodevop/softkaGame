class question {
  id?: number;
  description: string;
  status?: boolean;
  id_categorie?: number;
  id_response?: number;

  constructor(descripcion: string) {
    this.description = descripcion;
  }

  getQuestion() {
    //llamado a la DB para conseguir las preguntas  
  }

  createQuestion() { }
  
  updateQuestion() { }

  deleteQuestion() { }
}

module.exports = question;
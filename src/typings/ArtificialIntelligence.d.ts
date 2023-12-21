
interface Analysis {
    text:            string;
    intentions:      AnalysisIntent[];
    entities:        AnalysisEntity[];
    contents:        Content[];
    provider:        string;
    modelId:         string;
}

interface AnalysisIntent {
    id:     string;
    score:  number;
    name?:  string;
}

interface AnalysisEntity {
    id:    string;
    value: string;
    name?: string;
}

interface EntityValue {
    name: string;
    synonymous: any[];
}

interface Entity {
    id?: string;
    name: string;
    values: EntityValue[];
}

interface Content {
    id: string
    name: string
    result: Result
}
  
interface Result {
    type: string
    content: string
}

interface Intent {
    id?: string;
    storageDate?: Date;
    name: string;
    questions?: any[];
    answers?: any[];
    countQuestions?: number;
    tooltip?: any;
    healthScore?: any;
}
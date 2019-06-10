interface Analysis {
    text:            string;
    intentions:      AnalysisIntention[];
    entities:        AnalysisEntity[];
    provider:        string;
    modelId:         string;
}

interface AnalysisIntention {
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

interface Intention {
    id?: string;
    storageDate?: Date;
    name: string;
    questions?: any[];
    answers?: any[];
    countQuestions?: number;
    tooltip?: any;
    healthScore?: any;
}

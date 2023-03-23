import * as ts from "typescript";

export const ensureVariableIsArrowFunction = (node: ts.VariableDeclaration) => ts.isIdentifier(node.name)
    && node.initializer
    && ts.isArrowFunction(node.initializer)

export const ensureCodeIsAFunction = (code: string) => {
    const source = ts.createSourceFile("temp.ts", code, ts.ScriptTarget.Latest);
    const statments = source.statements.filter((statment) => !ts.isEmptyStatement(statment))
    if (statments.length > 1) return null
    const [possibleFunction] = statments

    if (ts.isFunctionDeclaration(possibleFunction)) {
        return { name: possibleFunction.name?.getText(source), parameters: possibleFunction.parameters.map((p) => p.name.getText(source))}
    }
    
    if (ts.isVariableStatement(possibleFunction)) {
        const arrowFunction = possibleFunction.declarationList.declarations.find(ensureVariableIsArrowFunction) as ts.VariableDeclaration & {initializer: ts.ArrowFunction}
       return { name: arrowFunction.name.getText(source), parameters: arrowFunction.initializer.parameters.map((p) => p.name.getText(source)) }
    }

    return null;
}
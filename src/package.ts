/**
 * The structure of a file entry in the .fpi.index.json file of a package, according to version 2 @see https://hl7.org/fhir/packages.html
 */
export interface FileInPackageIndex {
  filename: string;
  resourceType: string;
  id: string;
  url?: string;
  name?: string;
  version?: string;
  kind?: string;
  type?: string;
  supplements?: string;
  content?: string;
  baseDefinition?: string;
  derivation?: string;
  date?: string;
}

/**
 * The structure of a package's `.index.json` and `.fpi.index.json` files, according to version 2 @see https://hl7.org/fhir/packages.html
 */
export interface PackageIndex {
  'index-version': number;
  files: FileInPackageIndex[];
}

/**
 * A basic interface for package.json structure with some extra elements
 */
export interface PackageManifest {
  name: string;
  version: string;
  dependencies?: { [key: string]: string };
  installedPath?: string;
  '.index.json'?: PackageIndex;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface FileIndexEntryWithPkg extends FileInPackageIndex {
  __packageId: string;
  __packageVersion?: string;
}


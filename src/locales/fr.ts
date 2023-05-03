/* eslint-disable max-len */
import translations from './fr.json';

const fr = {
  ...translations,
  entities: {
    study: {
      study_code: "Code de l'étude",
      study: 'Étude',
      studies: 'Études',
      studyAuto: '{count, plural, =0 {Étude} =1 {Étude} other {Études}}',
      access_limitations: 'Restrictions d’accès',
      access_requirements: 'Conditions d’utilisation',
      access_authority: "Autorité d'accès",
    },
    biospecimen: {
      sample_id: 'Échantillon',
      samplesAuto: '{count, plural, =0 {Échantillon} =1 {Échantillon} other {Échantillons}}',
      biospecimensAuto: '{count, plural, =0 {Biospécimen} =1 {Biospécimen} other {Biospécimens}}',
      biospecimen: 'Biospécimen',
      biospecimens: 'Biospécimens',
      sample_type: "Type d'échantillon",
      biospecimen_tissue_source: 'Tissue',
      biospecimen_id: 'Biospécimen',
      age_biospecimen_collection: 'Âge',
      age_biospecimen_collection_tooltip: 'Âge au prélèvement du biospécimen (jours)',
    },
    participant: {
      participant_id: 'Participant',
      submitter_participant_id: 'Identifiant participant ext.',
      submitter_participant_id_tooltip: "Identifiant du participant soumis par l'étude",
      participant: 'Participant',
      participants: 'Participants',
      id: 'Identifiant',
      participantAuto: '{count, plural, =0 {Participant} =1 {Participant} other {Participants}}',
      participantsSamples: 'Participants / Échantillons',
      participantSample: 'Participant / Échantillon',
      profile: 'Profil',
      family: 'Famille',
      diagnosis: 'Diagnostic',
      diagnoses: 'Diagnostics',
      diagnosis_mondo: 'Diagnostic (MONDO)',
      diagnosis_ICD: 'Diagnostic (ICD-10)',
      diagnosis_source_text: 'Diagnostic (texte source)',
      age_at_diagnosis: 'Âge',
      age_at_diagnosis_tooltip: 'Âge au diagnostic (jours)',
      age_at_phenotype: 'Âge',
      age_at_phenotype_tooltip: 'Âge au phénotype du biospécimen (jours)',
      phenotype: 'Phénotype',
      phenotypes: 'Phénotypes',
      family_type: 'Type de famille',
      family_position: 'Position familiale',
      gender: 'Genre',
      ethnicity: 'Éthnicité',
      age_at_recruitment: 'Âge au recrutement (jours)',
      vital_status: 'Statut vital',
      age_of_death: 'Âge au décès (jours)',
      cause_of_death: 'Cause du décès',
      disease_status: 'Statut clinique',
      cancer: 'Cancer',
      mondo_term: 'Terme MONDO',
      mondo_term_tooltip: '# de participants avec le terme MONDO exact',
      phenotype_code: 'Phénotype (HPO)',
      phenotype_source_text: 'Phénotype (texte source)',
      interpretation: 'Interprétation',
      hpo_term: 'Terme HPO',
      hpo_term_tooltip: '# de participants avec le terme HPO exact',
    },
    file: {
      file: 'Fichier',
      files: 'Fichiers',
      datafile: 'Fichier',
      datafiles: 'Fichiers',
      filesAuto: '{count, plural, =0 {Fichier} =1 {Fichier} other {Fichiers}}',
      file_id: 'Identifiant',
      file_name: 'Nom',
      file_format: 'Format',
      file_size: 'Taille',
      ferload_url: 'URL',
      file_hash: 'Hash',
      participants: '{count, plural, =0 {Participant} =1 {Participant} other {Participants}}',
      samples: '{count, plural, =0 {Échantillon} =1 {Échantillon} other {Échantillons}}',
      analysis: 'Analyse',
      type: 'Type',
      data_type: 'Type de données',
      data_category: 'Catégorie',
      data_access: 'Accès aux données',
      experimentalProcedure: 'Procédure expérimentale',
      analysisProperties: 'Propriétés de l’analyse',
      sequencing_experiment: {
        experimental_strategy: 'Stratégie expérimentale',
        type_of_sequencing: 'Type de séquençage',
        read_length: 'Longueur des fragments',
        platform: 'Plateforme',
        capture_kit: 'Kit de capture',
        sequencer_id: 'Séquenceur',
        run_date: 'Date (aaaa-mm-jj)',
        run_name: 'Run',
        labAliquotID: 'Aliquot',
        bio_informatic_analysis: "Type d'analyse",
        workflow_name: 'Pipeline',
        workflow_version: 'Version',
        genome_build: 'Génome build',
        analysis_id: 'Identifiant',
      },
      analysisFiles: "Fichiers générés par l'analyse",
      numberByExperimentalStrategy: 'Nombre par stratégie expérimentale',
      numberByDataTypes: 'Nombre par type de données',
      'n=2': '(n={count})',
      nTooltip: 'Nombre total de fichiers associés au participant',
    },
    variant: {
      variant: 'Variant',
      variants: 'Variants',
      variantAuto: '{count, plural, =0 {Variant} =1 {Variant} other {Variants}}',
      type: 'Type',
      variant_class: 'Variant class',
      variant_id: 'Variant ID',
      gnomAd: 'GnomAD',
      gnomAdTooltip: 'gnomAD 3.1.1 Allèle Frequence',
      gnomadGenome311: 'gnomAD Genome (v3.1.1)',
      genome_build: 'Genome build',
      dbsnp: 'dbSNP',
      chromosome: 'Chromosome',
      position: 'Position',
      cytoband: 'Cytobande',
      altAllele: 'Allèle ALT',
      refAllele: 'Allèle REF',
      alternativeAllele: 'Allèle alternatif',
      referenceAllele: 'Allèle de référence',
      referenceGenome: 'Génome référence',
      genes: 'Gènes',
      gene: 'Gène',
      genePhenotype: 'Gène - Phénotype',
      homozygotes: {
        title: 'Homo.',
        tooltip: '# de Homozygotes',
      },
      alt: {
        title: 'ALT',
        tooltip: '# de allèle alternative',
      },
      frequence: {
        title: 'Freq.',
        tooltip: 'Frequence du variant parmis les cohortes du CQDG',
      },
      participant: {
        title: 'Part.',
        tooltip: '# de participants affectés parmis les cohortes du CQDG',
      },
      consequences: {
        consequence: 'Conséquence',
        consequences: 'Conséquences',
        geneConsequences: 'Conséquences géniques',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'BAS',
          moderate: 'MODÉRÉ',
          high: 'HAUT',
        },
        predictions: {
          predictions: 'Prédictions',
          sift: 'Sift',
          polyphen2: 'Polyphen2',
          fathmm: 'Fathmm',
          cadd: 'Cadd',
          dann: 'Dann',
          lrt: 'Lrt',
          revel: 'Revel',
        },
        aaColumn: 'AA',
        aaColumnTooltip: 'Substitution acide aminé',
        cdnaChangeColumn: 'ADN codant',
        conservationColumn: 'Conservation',
        strand: 'Brin',
        vep: 'VEP',
        transcript: 'Transcrit',
        refSeq: 'RefSeq',
        omim: 'OMIM',
        hidetranscript: 'Voir moins',
        showtranscript: '{count} autre(s) transcript(s)',
        canonical: 'Transcrit canonique',
      },
      frequencies: {
        frequency: 'Fréquence',
        frequencies: 'Fréquences',
        frequencyTooltip: 'Fréquence du variant dans les études du CQDG',
        CQDGStudies: 'Études du CQDG',
        publicCohorts: 'Cohortes publiques',
        studies: 'Études',
        domain: 'Domaine',
        participants: 'Participants',
        participantsTooltip: '# de participants affectés dans les études du CQDG',
        altAlleles: 'Allèles ALT',
        altAllelesTooltip: 'Nombre d’allèles alternatifs',
        altRef: 'Allèles (ALT + REF)',
        altRefTooltip: 'Allèles alternatifs + Allèles de référence',
        homozygotes: 'Homozygotes',
        homozygotesTooltip: 'Nombre de variants homozygotes',
        total: 'Total',
        cohort: 'Cohorte',
      },
      pathogenicity: {
        pathogenicity: 'Pathogénicité',
        pathogenicities: 'Pathogénicités',
        clinVar: 'ClinVar',
        condition: 'Condition',
        inheritance: 'Héritage',
        source: 'Source',
      },
    },
  },
  global: {
    yes: 'Oui',
    no: 'Non',
    other: 'Autre',
    delete: 'Supprimer',
    summary: 'Résumé',
    search: {
      genes: {
        emptyText: 'Aucun gène trouvé',
        placeholder: 'ex : BRAF, ENSG00000157764',
        title: 'Recherche par gène',
        tooltip: 'Entrer un Symbole de gène, Alias de gène ou un Ensembl ID',
      },
      variants: {
        emptyText: 'Aucun variant trouvé',
        placeholder: 'ex : 10-100063679-T-C, rs341',
        title: 'Recherche par variant',
        tooltip:
          'Entrer un Locus de Variant, Symbol de gène, Alias de gène, Gène AA Change, dbSNP ID, Clinvar ID, Ensembl ID, refseq ID',
      },
    },
    filters: {
      actions: {
        all: 'Tout',
        none: 'Aucun',
        clear: 'Effacer',
        less: 'Moins',
        more: 'Plus',
        apply: 'Appliquer',
        dictionary: 'Dictionnaire',
        cancel: 'Annuler',
      },
      operators: {
        allOf: 'Tout',
        anyOf: 'N’importe quel',
        noneOf: 'Aucun',
        between: 'Entre',
        lessthan: 'Moins que',
        lessthanorequal: 'Moins que ou égale',
        greaterthan: 'Plus grand que',
        greaterthanorequal: 'Plus grand que ou égale',
      },
      range: {
        is: 'Est',
        from: 'De',
        to: 'A',
        actualInterval: 'Intervalle actuel : ',
      },
      messages: {
        empty: 'Aucune valeur trouvée',
      },
      checkbox: {
        placeholder: 'Chercher...',
      },
    },
    forms: {
      errors: {
        minCharacters: 'caractères minimum',
        requiredField: 'Ce champs est requis',
        enterValidEmail: 'Entrer un email valide',
      },
    },
    errors: {
      403: "Désolé, vous n'êtes pas autorisé à accéder à cette page.",
      404: "Désolé, cette page n'existe pas.",
      500: 'Désolé, quelque chose en va pas.',
      backHome: 'Retour accueil',
    },
    notification: {
      genericError: 'Une erreur est apparue',
    },
    proTable: {
      results: 'Résultats',
      noResults: 'Aucun résultat',
      of: 'de',
      selected: 'élément selectionné',
      selectedPlural: 'éléments selectionnés',
      selectAllResults: 'Selectionner tous les résultats',
      clear: 'Effacer',
      tableExport: 'Exporter en TSV',
      reset: 'Réinitialiser',
      columns: 'Colonnes',
    },
    seeLess: 'Voir moins',
    seeMore: 'Voir plus',
  },
  api: {
    savedFilter: {
      error: {
        title: 'Erreur',
        messageUpdate: 'Impossible de modifier le filtre',
        messageDelete: 'Impossible de supprimer le filtre',
      },
    },
    savedSet: {
      error: {
        title: 'Erreur',
        messageUpdate: "Impossible de modifier l'ensemble",
        messageDelete: "Impossible de supprimer l'ensemble",
        messageCreate: "Impossible de créer l'ensemble",
      },
      success: {
        titleCreate: 'Votre ensemble a été enregistré.',
        messageCreate: 'Vous pouvez ajouter vos ensembles a une requête ou au tableau de bord.',
        titleUpdate: 'Succès',
        messageUpdate: 'Votre ensemble a été modifié.',
        titleDelete: 'Succès',
        messageDelete: 'Votre ensemble a été supprimé.',
      },
    },
    report: {
      error: {
        title: 'Erreur',
        message:
          "Nous n'avons pas pu générer le rapport pour le moment. Veuillez réessayer plus tard ou ",
        support: 'contactez le support',
        tooMuchFilesTitle: 'Nombre maximal dépassé',
        tooMuchFiles:
          'Un maximum de 10 000 fichiers peuvent être inclus à la fois. Veuillez restreindre votre sélection et réessayer.',
      },
      inProgress: {
        title: 'Traitement',
        fetchReport: 'Récupération du rapport, veuillez patienter',
      },
      onSuccess: {
        title: 'Succès',
        fetchReport: 'Rapport téléchargé avec succès',
      },
      clinicalData: {
        download: 'Données cliniques',
        family:
          '{count, plural, =0 {Participant séléctionné et famille} =1 {Participant séléctionné et famille} other {Participants séléctionnés et familles}}',
        participant:
          '{count, plural, =0 {Participant séléctionné} =1 {Participant séléctionné} other {Participants séléctionnés}}',
      },
      sampleData: {
        download: "Données d'échantillons",
      },
      fileManifest: {
        button: 'Manifeste',
        title: 'Fichier manifeste',
        okText: 'Télécharger',
        cancel: 'Annuler',
        text: `Télécharger un manifeste des fichiers sélectionnés. Celui-ci pourra être utilisé par l'outil de téléchargement rapide des données du CQDG*. Ce manifeste comprend également des informations supplémentaires, notamment sur les participants et les échantillons associés à ces fichiers.`,
        subText: '*En développement et bientôt disponible.',
        textCheckbox: `Inclure les fichiers de données de même type des membres de la famille des participants représentés dans les fichiers sélectionnés.`,
      },
      requestAccess: {
        button: 'Demande d’accès',
        title: 'Demande d’accès',
        okText: 'Télécharger',
        cancel: 'Annuler',
        text: `Télécharger les documents requis par les études pour votre demande d'accès aux données. Ces documents fournissent des informations sur les conditions d'utilisation des données autorisées ainsi qu'une liste complète par étude des fichiers sélectionnés. Pour en savoir davantage, consulter la page `,
        textLink: `Demande d'accès aux données`,
        textCheckbox: `Inclure tous les fichiers de même type sur les membres des familles représentées dans cette sélection.`,
      },
    },
    noData: 'Aucune donnée',
  },
  components: {
    search: {
      selectSavedSet: 'Sélectionner un ensemble',
      searchByParticipantId: 'Recherche par ID de participant',
      savedParticipantSets: 'Ensemble de participants',
      noParticipantFound: 'Aucun participant trouvé',
      noParticipantSetFound: 'Aucun ensemble de participants trouvé',
      participantPlaceholder: 'ex : PT0483333',
      searchBySampleId: 'Recherche par ID d’échantillon',
      savedSampleSets: 'Ensemble d’échantillons',
      noSampleFound: 'Aucun sample trouvé',
      noSampleSetFound: 'Aucun ensemble d’échantillons trouvé',
      samplePlaceholder: 'ex : SR0230956',
      searchByFileId: 'Recherche par ID de fichier',
      savedFileSets: 'Ensemble de fichiers',
      noFileFound: 'Aucun fichier trouvé',
      noFileSetFound: 'Aucun ensemble de fichier trouvé',
      filePlaceholder: 'ex : FI0080837',
    },
    uploadIds: {
      participant: 'participant',
      participantID: 'ID de participant',
      participantPlaceholder: 'ex : PT0483333',
      sampleTitle: "Téléverser une liste d'échantillons",
      sample: 'échantillon',
      sampleID: "ID d'échantillon",
      samplePlaceholder: 'ex : SR0230956',
      file: 'fichier',
      fileID: 'ID de fichier',
      filePlaceholder: 'ex : FI0080837',
      title: 'Téléverser une liste de {entity}s',
      submittedColTitle: 'Identifiants {entity} soumis',
      uploadBtnText: 'Téléverser une liste de {entity}s',
      mappedTo: 'Orienté vers',
      collapseTitle:
        'Tableau récapitulatif ({matchCount} correspondant, {unMatchCount} non correspondant)',
      inputLabel: "Copier-coller une liste d'identifiants ou télécharger un fichier",
      match: '({count}) correspondances',
      unmatch: '({count}) sans correspondance',
      tableMessage:
        '{submittedCount} identifiants soumis mappés sur {mappedCount} identifiants système uniques',
      matchTable: {
        idcol: 'ID {entity}',
        participant: {
          matchcol: 'ID du participant',
          mappedcol: "Code de l'étude",
        },
        file: {
          matchcol: 'ID du fichier',
          mappedcol: "Code de l'étude",
        },
        biospecimen: {
          matchcol: "ID de l'échantillon",
          mappedcol: "Code de l'étude",
        },
      },
      pillTitle: 'Liste téléchargée',
      upload: {
        fileBtn: 'Télécharger un fichier',
        btn: 'Télécharger',
      },
      clearBtn: 'Effacer',
      cancelBtn: 'Annuler',
      emptyTable: 'Aucune donnée',
      popover: {
        title: 'Identifiants et formats de fichiers',
        identifiers: 'Identifiants',
        separatedBy: {
          title: 'Séparé par',
          values: 'virgule, espace, nouvelle ligne',
        },
        uploadFileFormats: 'Télécharger des formats de fichiers',
      },
    },
    filterList: {
      collapseAll: 'Tout fermer',
      expandAll: 'Tout ouvrir',
    },
    table: {
      itemCount: {
        singlePage: '{count, plural, =0 {No result} autre {<strong>#</strong> résultat}}',
        multiplePages:
          'Résultat <strong>{from}</strong> - <strong>{to}</strong> de <strong>{total}</strong>',
      },
    },
    suggester: {
      error: {
        title: 'Erreur',
        description: "Une erreur s'est produite lors de la récupération des suggestions",
      },
      noResultsFound: 'Aucun résultat trouvé',
    },
    querybuilder: {
      defaultTitle: 'Filtre sans titre',
      header: {
        modal: {
          edit: {
            title: 'Enregistrer ce filtre',
            okText: 'Enregistrer',
            cancelText: 'Annuler',
            input: {
              label: 'Nom du filtre',
              placeholder: 'Filtre sans titre',
              maximumLength: 'caractères maximum',
            },
          },
          saveThisFilter: 'Enregistrer ce filtre',
          confirmUnsaved: {
            title: 'Modifications non enregistrées',
            openSavedFilter: {
              okText: 'Continuer',
              cancelText: 'Annuler',
              content:
                "Vous êtes sur le point d'ouvrir un filtre enregistré; toutes les modifications seront perdues.",
            },
            createNewFilter: {
              okText: 'Créer',
              cancelText: 'Annuler',
              content:
                'Vous êtes sur le point de créer un nouveau filtre; toutes les modifications seront perdues.',
            },
          },
        },
        popupConfirm: {
          delete: {
            title: 'Supprimer définitivement ce filtre ?',
            okText: 'Supprimer le filtre',
            cancelText: 'Annuler',
            content:
              'Vous êtes sur le point de supprimer définitivement ce filtre et toutes ses requêtes.',
          },
        },
        tooltips: {
          newQueryBuilder: 'Nouveau filtre',
          save: 'Enregistrer le filtre',
          saveChanges: 'Enregistrer les changements',
          delete: 'Supprimer',
          duplicateQueryBuilder: 'Dupliquer le filtre',
          share: "Partager (Copier l'URL)",
          setAsDefaultFilter: 'Définir comme filtre par défaut',
          unsetDefaultFilter: 'Filtre par défaut non défini',
          undoChanges: 'Filtre par défaut non défini',
          noSavedFilters: "Vous n'avez aucun filtre enregistré",
        },
        myFiltersDropdown: {
          title: 'Mes filtres',
          manageMyFilter: 'Gérer mes filtres',
        },
        duplicateFilterTitleSuffix: 'COPIER',
      },
      query: {
        combine: {
          and: 'et',
          or: 'ou',
        },
        noQuery: 'Utilisez les outils de recherche et les facettes à gauche pour créer une requête',
      },
      actions: {
        new: 'Nouveau',
        changeOperatorTo: "Changer d'opérateur pour",
        addQuery: 'Nouvelle requête',
        combine: 'Combiner',
        labels: 'Étiquettes',
        delete: {
          title: 'Supprimer cette requête?',
          titleSelected: 'Supprimer cette requête?',
          cancel: 'Annuler',
          confirm: 'Supprimer',
        },
        clear: {
          title: 'Supprimer toutes les requêtes?',
          cancel: 'Annuler',
          confirm: 'Supprimer',
          buttonTitle: 'Tout effacer',
          description:
            'Vous êtes sur le point de supprimer toutes vos requêtes. Ils seront perdus à jamais.',
        },
      },
    },
    savedSets: {
      modal: {
        edit: {
          title: "Modifier l'ensemble",
          okText: 'Enregistrer',
          cancelText: 'Annuler',
          input: {
            label: "Nom de l'ensemble",
            placeholder: 'Entrer le nom de votre ensemble',
            maximumLength: 'Caractères maximum',
          },
        },
        add: {
          title: 'Ajouter a un ensemble {type}',
          okText: 'Ajouter a un ensemble',
          cancelText: 'Annuler',
          enterName: 'Entrer le nom de votre nouvel ensemble',
          name: "Nom de l'ensemble",
        },
        remove: {
          title: "Retirer d'un ensemble {type}",
          okText: "Retirer d'un ensemble",
          cancelText: 'Annuler',
        },
      },
      popupConfirm: {
        delete: {
          title: 'Supprimer définitivement cet ensemble ?',
          okText: 'Supprimer cet ensemble',
          cancelText: 'Annuler',
          content: 'Vous êtes sur le point de supprimer définitivement cet ensemble.',
        },
      },
    },
    dataRelease: {
      title: 'Données disponibles',
      dataReleaseLink: 'Publication des données v1.0',
      dataExploration: 'Exploration des données',
    },
  },
  layout: {
    main: {
      menu: {
        dashboard: 'Tableau de bord',
        studies: 'Études',
        explore: 'Exploration',
        website: 'Site web',
        documentation: 'Documentation',
        community: 'Communauté',
      },
    },
    user: {
      menu: {
        settings: 'Paramètres de profil',
        logout: 'Se déconnecter',
        signedWith: 'Connecté en tant que',
      },
    },
  },
  screen: {
    loginPage: {
      title: 'Portail de données',
      resume:
        "Le Centre québécois de données génomiques est une plateforme d'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.",
      login: 'Connexion',
      signup: 'Créer un compte',
    },
    memberProfile: {
      notFound: 'Membre non trouvé',
      rolesTitle: 'Rôle(s)',
      noRoles: 'Aucun rôle',
      usageTitle: 'Utilisation prévue des données du portail CQDG',
      researchDomainsTitle: 'Domaine(s) de recherche ou domaine(s) d’intérêt',
      noUsage: 'Aucune utilisation',
      noResearchDomain: 'Aucun domaine de recherche',
      editProfileBtn: 'Modifier le profil',
      communityBtn: 'Communauté',
    },
    community: {
      title: 'Communauté CQDG',
      resultsMember: 'Membres',
      noResults: 'Aucun membre',
      search: {
        filters: 'Filtres',
        inputPlaceholder: 'ex : Watson, Linda Children’s Hospital of Philadelphia',
        selectPlaceholder: 'Sélectionner',
        role: 'Rôle',
        dataUse: 'Utilisation des données',
        researchDomain: 'Domaine de recherche',
        clearFilters: 'Effacer les filtres',
        barPlaceholder: 'Recherche par nom ou affiliation',
        sorter: {
          newest: 'Plus récent',
          oldest: 'Plus ancien',
          lastnameAlpha: 'Alphabétique (nom de famille)',
        },
      },
    },
    profileSettings: {
      title: 'Paramètres de profil',
      viewProfile: 'Voir le profil',
      cards: {
        deleteAccount: {
          title: 'Supprimer le compte',
          button: 'Supprimer mon compte',
          notice:
            'Vous ne pourrez plus vous connecter au portail de données CQDG. Tous vos ensembles et requêtes enregistrés seront perdus. Vous pouvez créer un nouveau compte à tout moment.',
          confirm: {
            content: 'Êtes-vous sûr(e) de vouloir supprimer définitivement ce compte ?',
          },
        },
        identification: {
          title: 'Identification',
          alert:
            "Vous êtes authentifié avec <strong>{provider}</strong> utilisant <strong>{email}</strong>. Cet e-mail n'est jamais affiché au public et ne peut pas être modifié.",
          firstName: 'Prénom',
          yourFirstName: 'Votre prénom',
          lastName: 'Nom de famille',
          yourLastName: 'Votre nom de famille',
          publicEmail: 'Email publique',
          publicEmailNotice:
            'Cet e-mail sera affiché sur votre page de profil et accessible à tous les utilisateurs connectés du portail.',
          editPhotoModalTitle: 'Modifier photo',
          uploadImageError: 'Impossible de télécharger votre image pour le moment',
          removePhotoModalTitle: 'Supprimer la photo de profil ?',
          removePhotoModalButton: 'Oui supprimer la photo',
          removePhotoModalMessage:
            'Voulez-vous vraiment supprimer votre photo ? Nous le remplacerons par un avatar par défaut.',
          uploadPhotoButton: 'Envoyer la photo',
          removePhotoButton: 'Supprimer la photo',
        },
        roleAffiliation: {
          title: 'Rôle et affiliation',
          iama: 'Je suis un(e)',
          checkAllThatApply: 'Cochez toutes les cases',
          provideAffiliation: 'Indiquez votre affiliation institutionnelle ou organisationnelle',
          affiliatedWith: 'Je suis affilié(e) à',
          dontHaveAffiliation: "Je n'ai pas d'affiliation institutionnelle",
          describeResearchArea:
            "Mon domaine de recherche ou domaine d'intérêt peut être décrit comme",
          provideABriefLink:
            'Fournissez une brève description et un lien vers votre biographie professionnelle ou le site Web de votre organisation, si disponible',
        },
        researchDomain: {
          title: 'Domaine de recherche',
          label: 'Domaine(s) de recherche ou domaine(s) d’intérêt',
          checkAll: 'Cochez toutes les cases',
        },
        saveChanges: 'Enregistrer les modifications',
        discardChanges: 'Annuler les modifications',
      },
      roleOptions: {
        researcher_in_academic_or_non_profit_institution:
          'Chercheur(e) dans une institution académique ou sans but lucratif',
        representative_of_commercial_or_for_profit_company:
          "Représentant(e) d'une entreprise commerciale ou à but lucratif",
        bioinformatician_software_developer: 'Bioinformaticien(ne), développeur(e) logiciel',
        clinician: 'Clinician',
        employee_in_governmental_agency: 'Employé(e) d’un organisme gouvernemental',
        other: 'Autre',
      },
      researchDomainOptions: {
        aging: 'Vieillissement',
        bioinformatics: 'Bioinformatique',
        birth_defects: 'Malformations congénitales',
        cancer: 'Cancer',
        circulatory_respiratory_health: 'Santé circulatoire et respiratoire',
        general_health: 'Santé générale',
        infection_immunity: 'Infection et immunité',
        musculoskeletal_health_arthritis: 'Santé musculo-squelettique et arthrite',
        neurodevelopmental_conditions: 'Conditions neuro-développementales',
        neurosciences_mental_health_addiction: 'Neurosciences, santé mentale et toxicomanie',
        nutrition_metabolism_diabetes: 'Nutrition, métabolisme et diabète',
        population_genomics: 'Génomique des populations',
        rare_diseases: 'Maladies rares',
        not_applicable: "Ne s'applique pas",
        other: 'Autre',
      },
    },
    dashboard: {
      hello: 'Bonjour',
      cards: {
        error: {
          title: 'Erreur de connexion',
          subtitle:
            'Nous ne sommes actuellement pas en mesure de nous connecter à ce service. Veuillez actualiser la page et réessayer. Si le problème persiste, veuillez',
          contactSupport: 'contactez le support',
          pleaseRefresh: 'Veuillez actualiser et réessayer ou ',
        },
        savedFilters: {
          title: 'Filtres enregistrés',
          popoverTitle: 'Gestion des filtres enregistrés',
          popoverContent:
            "Un filtre enregistré est une requête virtuelle créée en appliquant un ou plusieurs filtres à une requête de recherche. Ils peuvent être enregistrés et revisités pour une utilisation ultérieure sans avoir à resélectionner manuellement les filtres dans la barre latérale. Vous pouvez créer des filtres enregistrés à l'aide de l'outil de gestion des requêtes au-dessus du tableau des résultats dans la ",
          popoverContentLink: 'page Exploration des données',
          noSaved: "Vous n'avez aucun filtre enregistré",
          lastSaved: 'Dernier enregistrement : il y a {date}',
          dataExploration: 'Exploration des données',
          variants: 'Variants',
          failedFetch: 'Échec de la récupération des filtres enregistrés',
        },
        savedSets: {
          title: 'Ensembles enregistrés',
          popoverTitle: 'Gestion des ensembles enregistrés',
          popoverContent:
            "Un ensemble enregistré est un ensemble d'un ou plusieurs ID d'entité qui peuvent être enregistrés et revisités pour une utilisation ultérieure sans avoir à resélectionner manuellement les ID d'entité. Vous pouvez créer des ensembles enregistrés de participants, d'échantillons biologiques et de fichiers en haut du tableau des résultats dans la ",
          popoverContentLink: 'page Exploration des données',
          noSaved: 'Vous n’avez aucun ensemble enregistré',
          lastSaved: 'Dernier enregistrement : il y a {date}',
          files: 'Fichiers',
          participants: 'Participants',
          biospecimens: 'Biospécimens',
          failedFetch: 'Échec de la récupération des ensembles enregistrés',
        },
      },
    },
    variants: {
      title: 'Variants',
      noDataVariant: 'Aucune donnée disponible pour ce variant',
      sidemenu: {
        participant: 'Participant',
        variant: 'Variant',
        gene: 'Gène',
        frequency: 'Fréquence',
        pathogenicity: 'Pathogénicités',
      },
    },
    studies: {
      title: 'Études',
      code: 'Code',
      name: 'Nom',
      domain: 'Domaine',
      population: 'Population',
      participants: 'Participants',
      families: 'Familles',
      genomics: 'Génomique',
      transcriptomics: 'Transcriptomique',
      imaging: 'Imagerie',
      files: 'Fichiers',
      accessLimitation: 'Restriction d’accès',
      accessRequirement: 'Exigence d’accès',
      sampleAvailability: 'Disponibilité des échantillons',
      description: 'Description',
    },
    dataExploration: {
      title: 'Exploration',
      sidemenu: {
        participant: 'Participant',
        biospecimen: 'Biospécimen',
        datafiles: 'Fichier de données',
      },
      hpoTree: {
        modal: {
          title: 'Navigateur de phénotype observé (HPO)',
          okText: 'Appliquer',
        },
        searchPlaceholder: "Recherche par terme d'ontologie - min 3 caractères",
        emptySelection:
          'Sélectionnez des éléments dans le volet de gauche afin de les ajouter à votre requête.',
        tags: {
          exact: 'Participants avec ce terme exact',
          all: 'Participants y compris les termes descendants',
        },
      },
      mondoTree: {
        modal: {
          title: 'Navigateur de diagnostic (MONDO)',
          okText: 'Appliquer',
        },
        searchPlaceholder: "Recherche par terme d'ontologie - min 3 caractères",
        emptySelection:
          'Sélectionnez des éléments dans le volet de gauche afin de les ajouter à votre requête.',
        tags: {
          exact: 'Participants avec ce terme exact',
          all: 'Participants y compris les termes descendants',
        },
      },
      icdTree: {
        modal: {
          title: 'Navigateur de diagnostic (ICD-10)',
          okText: 'Appliquer',
        },
        searchPlaceholder: "Recherche par terme d'ontologie - min 3 caractères",
        emptySelection:
          'Sélectionnez des éléments dans le volet de gauche afin de les ajouter à votre requête.',
        tags: {
          exact: 'Participants avec ce terme exact',
          all: 'Participants y compris les termes descendants',
        },
      },
      tabs: {
        summary: {
          title: 'Résumé',
          global: {
            nbParticipant:
              '{count} participants (y compris les termes descendants sur cette arborescence)',
            addTermToQuery: 'Ajouter un terme à la requête active',
            currentPath: 'Arborescence actuelle',
            centerSubtitleFormatter: 'Participants avec',
          },
          sociodemographics: {
            cardTitle: 'Profils sociodémographiques',
            genderTitle: 'Genre',
            ethnicityTitle: 'Ethnicité',
            compositionFamilyTitle: 'Composition familiale',
          },
          availableData: {
            dataCategoryTitle: 'Participants par catégorie de données',
            dataTypeTitle: 'Participants par type de données',
            studiesTitle: 'Participants par étude',
            axis: '# de participants',
            dataCategory: 'Catégorie de données',
            dataType: 'Type de données',
          },
          observed_phenotype_tagged: {
            cardTitle: 'Phénotypes observés (HPO)',
            empty: 'Aucun phénotype observé signalé pour ces participants',
          },
          mondo: {
            cardTitle: 'Diagnostic (MONDO)',
            empty: 'Aucun diagnostic signalé pour ces participants',
          },
          studiespie: {
            cardTitle: 'Études',
            domainTitle: 'Études par domaine',
            popTitle: 'Études par type population',
            partTitle: 'Participants par étude',
          },
        },
        participants: {
          title: 'Participants ({count})',
          participant: 'Participant',
          study_code: 'Études',
          proband: 'Proband',
          gender: 'Genre',
          familyHistory: 'Historique familiale',
          ageAtRecruitment: 'Âge',
          ageAtRecruitmentTooltip: 'Âge au recrutement (jours)',
          ageAtDiagnosis: 'Âge au diagnostic',
          diagnosis: 'Diagnostic (MONDO)',
          phenotype: 'Phénotype (HPO)',
          files: 'Fichiers',
          ethnicity: 'Ethnicité',
          biospecimen: 'Biospécimen',
          vitalStatus: 'Statut vital',
          submitterParticipantId: 'Participant externe',
          ageAtDeath: 'Âge au décés',
          downloadClinicalData: 'Données cliniques',
          icdTagged: 'Diagnostic (ICD)',
          diagnosisSourceText: 'Diagnostic (texte source)',
        },
        biospecimens: {
          title: 'Biospécimens ({count})',
          biospecimen_id: 'Biospécimen',
          sample_id: 'Échantillon',
          participant_id: 'Participant',
          study_code: 'Étude',
          sample_type: "Type d'échantillon",
          biospecimen_tissue_source: 'Tissue',
          age_biospecimen_collection: 'Âge',
          age_biospecimen_collectionTooltip: 'Âge au prélèvement du biospécimen (jours)',
          files: 'Fichiers',
        },
        datafiles: {
          title: 'Fichiers de données ({count})',
          fileAuthorization: 'Autorisation du fichier',
          dataAccess: 'Accès aux données',
          file: 'Fichier',
          study_code: 'Étude',
          dataCategory: 'Catégorie de données',
          dataType: 'Type de données',
          experimentalStrategy: 'Stratégie expérimentale',
          accessUrl: 'Accès Url',
          format: 'Format',
          size: 'Taille',
          platform: 'Plateforme',
          name: 'Nom du fichier',
          participants: 'Participants',
          biospecimens: 'Biospécimens',
          controlled: 'Contrôlé',
          authorized: 'Autorisé',
          registered: 'Enregistré',
          sample: 'Échantillon',
        },
      },
      participantsSelected: 'participants séléctionnés',
      participantSelected: 'participant séléctionné',
      saveParticipantsSet: "Enregistrer l'ensemble de participants",
      participantCount: 'éléments à la fois. Les 10 000 premiers seront traités.',
      filesSelected: 'fichiers séléctionnés',
      fileSelected: 'fichier séléctionné',
      saveFilesSet: "Enregistrer l'ensemble de fichiers",
      biospecimensSelected: 'biospécimens séléctionnés',
      biospecimenSelected: 'biospécimen séléctionné',
      saveBiospecimensSet: "Enregistrer l'ensemble de biospécimens",
      variantsSelected: 'variants séléctionnés',
      variantSelected: 'variant séléctionné',
      saveVariantsSet: "Enregistrer l'ensemble de variants",
      searchByBiospecimenId: 'Recherche par ID biospécimen',
      searchByBiospecimenSampleId: 'Recherche par ID d’échantillon',
      noBiospecimenFound: 'Aucun biospécimen trouvé',
      noBiospecimenSetsFound: 'Aucun ensemble de biospécimen trouvé',
      noBiospecimenCollectionFound: 'Aucune ID collection trouvé',
      savedBiospecimenSets: 'Ensemble d’échantillons',
      saveAsNewSet: 'Enregistrer un nouvel ensemble',
      addToExistingSet: 'Ajouter à un ensemble existant',
      removeFromExistingSet: "Supprimer d'un ensemble existant",
      addToSet: "Ajouter à l'ensemble",
      addTypeSet: "Ajouter à l'ensemble de {type}",
      removeFromSet: "Retirer de l'ensemble",
      removeTypeSet: "Retirer de l'ensemble de {type}",
      set: 'Ensemble',
      chooseSet: 'Choisissez un ensemble',
    },
  },
  facets: {
    // Participant
    participant_id: 'ID de participant',
    study: {
      study_code: "Code de l'étude",
    },
    mondo: {
      name: 'Diagnostic (MONDO)',
    },
    mondo_tagged: {
      name: 'Diagnostic (MONDO)',
      source_text: 'Diagnostic (texte source)',
      age_at_event: 'Âge au diagnostic',
    },
    observed_phenotypes: {
      name: 'Phénotype (HPO)',
    },
    observed_phenotype_tagged: {
      name: 'Phénotype (HPO)',
      source_text: 'Phénotype (texte source)',
    },
    icd_tagged: {
      name: 'Diagnostic (ICD-10)',
    },
    age_at_recruitment: 'Âge au recrutement',
    gender: 'Genre',
    ethnicity: 'Ethnicité',

    // Biospecimen
    biospecimen_tissue_source: 'Tissue',
    age_biospecimen_collection: 'Âge au  prélèvement du biospécimen (jours)',
    sample_type: "Type d'échantillon",
    sample_id: "ID d'échantillon",
    biospecimen_id: 'ID de biospécimen',

    // File
    data_category: 'Catégorie de données',
    data_type: 'Type de données',
    file_format: 'Format',
    file_id: 'ID de fichier',
    sequencing_experiment: {
      experimental_strategy: 'Stratégie expérimentale',
    },

    //Variants
    variant_class: 'Variant class',
    variant_external_reference: 'Référence externe',
    chromosome: 'Chromosome',
    zygosity: 'Zygosité',
    transmissions: 'Transmissions',
    consequences: {
      consequences: 'Conséquences',
      biotype: 'Biotype',
    },

    //Genes
    gene_external_reference: 'Gene External reference',
    gene: {
      panels: 'Gene Panels',
    },
    genes: {
      name: 'Name',
      hpo: {
        hpo_term_label: 'Term label',
      },
      orphanet: {
        panel: 'Orphanet panel',
      },
      omim: {
        name: 'Omim',
      },
      ddd: {
        disease_name: 'DDD Disease Name',
      },
      cosmic: {
        tumour_types_germline: 'Cosmic Tumour Types Germline',
      },
    },

    // Studies
    study_code: "Code de l'étude",
    domain: 'Domaine',
    population: 'Population',
    data_access_codes: {
      access_limitations: 'Restriction d’accès',
      access_requirements: 'Exigence d’accès',
    },
  },
};

export default fr;

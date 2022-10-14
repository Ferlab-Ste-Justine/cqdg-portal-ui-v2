/* eslint-disable max-len */
import translations from './fr.json';

const fr = {
  ...translations,
  global: {
    yes: 'Oui',
    no: 'Non',
    search: {
      genes: {
        emptyText: 'Aucun gene trouvé',
        placeholder: 'e.g. BRAF, ENSG00000157764',
        title: 'Recherche par gene',
        tooltip: 'Entrer un Symbole de gène, Alias de gène ou Ensembl ID',
      },
      variants: {
        emptyText: 'Aucun variant trouvé',
        placeholder: 'e.g. 10-100063679-T-C, rs341',
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
      },
      operators: {
        between: 'Entre',
        lessthan: 'Moins que',
        lessthanorequal: 'Moins que ou égale',
        greaterthan: 'Plus grand que',
        greaterthanorequal: 'Plus grand que ou égale',
      },
      range: {
        is: 'Est',
      },
      messages: {
        empty: 'Aucune value trouvée',
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
      noResults: 'Aucun résultats',
      of: 'de',
      selected: 'element selectionné',
      selectedPlural: 'elements selectionnés',
    },
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
      },
    },
    cavatica: {
      error: {
        title: 'Erreur',
        projects: {
          fetch: 'Impossible de trouver vos projets Cavatica.',
          create: 'Impossible de créer votre projet Cavatica.',
        },
        billingGroups: {
          fetch: 'Impossible de trouver vos factures de groupe Cavatica.',
        },
        bulk: {
          import: 'Impossible de copier des fichiers à votre projet',
          fetchFiles: 'Impossible de trouver les fichiers séléctionnés',
        },
        fileAuth: {
          title: 'Fichiers non autorisés',
          description:
            "Vous n'êtes pas autorisé à analyser les fichiers que vous avez sélectionnés. En savoir plus sur l'accès aux données.",
        },
      },
      success: {
        title: 'Succès',
        projects: {
          create: 'Projet créé avec succès',
        },
        bulk: {
          import: {
            copySuccess: 'Vos fichiers ont été copiés dans: <strong>{destination}</strong>',
            possibleDelays:
              "Si vous avez téléchargé plus de 10 000 fichiers au cours des 5 dernières minutes, l'importation peut prendre un peu plus de temps\n.",
            openProject: 'Ouvrir le project dans Cavatica',
          },
        },
      },
    },
    report: {
      error: {
        title: 'Erreur',
        message:
          "Nous n'avons pas pu générer le rapport pour le moment. Veuillez réessayer plus tard ou ",
        support: 'contactez le support',
      },
      inProgress: {
        title: 'Traitement',
        fetchReport: 'Récupération du rapport, veuillez patienter',
      },
      onSuccess: {
        title: 'Succès',
        fetchReport: 'Rapport téléchargé avec succès',
      },
    },
    noData: 'Aucune donnée',
  },
  components: {
    filterList: {
      collapseAll: 'Réduire tout',
      expandAll: 'Développer tout',
    },
    table: {
      itemCount: {
        singlePage: '{count, plural, =0 {No result} other {<strong>#</strong> results}}',
        multiplePages:
          'Results <strong>{from}</strong> - <strong>{to}</strong> of <strong>{total}</strong>',
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
          title: 'Enregistrer cet ensemble',
          okText: 'Save',
          cancelText: 'Annuler',
          input: {
            label: 'Ensemble name',
            placeholder: 'Ensemble sans titre',
            maximumLength: 'Caractères maximum',
          },
        },
        add: {
          title: 'Ajouter a un ensemble {type}',
          okText: 'Ajouter a un ensemble',
          cancelText: 'Annuler',
        },
        remove: {
          title: "Retirer d'un ensemble {type}",
          okText: "Retirer d'un ensemble",
          cancelText: 'Annuler',
        },
      },
      popupConfirm: {
        delete: {
          title: 'Supprimer définitivement cet ensemble?',
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
      studies: 'Études',
      participants: 'Participants',
      biospecimens: 'Spécimens biologiques',
      datafiles: 'Fichiers de données',
    },
  },
  layout: {
    main: {
      menu: {
        dashboard: 'Tableau de bord',
        studies: 'Études',
        explore: 'Exploration des données',
        variants: 'Variants',
        participants: 'Participants',
        biospecimen: 'Spécimens biologiques',
        datafiles: 'Fichiers de données',
        website: 'Site web',
        documentation: 'Documentation',
        community: 'Communauté',
      },
    },
    user: {
      menu: {
        myprofile: 'Mon profil',
        settings: 'Paramètres',
        logout: 'Se déconnecter',
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
    dashboard: {
      hello: 'Bonjour',
      cards: {
        error: {
          title: 'Erreur de connexion',
          subtitle:
            'Nous ne sommes actuellement pas en mesure de nous connecter à ce service. Veuillez actualiser la page et réessayer. Si le problème persiste, veuillez',
          contactSupport: 'contactez le support',
        },
        cavatica: {
          title: 'Projets Cavatica',
          connectedNotice: "Vous êtes connecté à l'environnement cloud Cavatica.",
          disconnectedNotice:
            'Pour analyser les données INCLUDE sur le cloud, connectez-vous à Cavatica.',
          disconnect: 'Déconnecter',
          noProjects: "Vous n'avez pas de projets Cavatica.",
          createNewProject: 'Créez votre premier projet',
          membersCount: '{count, plural, =0 {member} =1 {# member} autre {# members}}',
          infoPopover: {
            title: 'Plateforme cloud de calcul CAVATICA',
            content:
              "CAVATICA est une plate-forme d'analyse de données basée sur le cloud où les données, les résultats et les flux de travail sont partagés entre la communauté de recherche mondiale.",
            readMore: 'Lire la suite',
          },
          newProject: 'Nouveau projet',
        },
        savedFilters: {
          title: 'Filtres enregistrés',
          noSavedFilters: "Vous n'avez aucun filtre enregistré",
          lastSaved: 'Last saved: {date} ago',
        },
        savedSets: {
          title: 'Ensembles enregistrés',
          popoverTitle: 'Gestion des ensembles enregistrés',
          popoverContent:
            "Un ensemble enregistré est un ensemble d'un ou plusieurs ID d'entité qui peuvent être enregistrés et revisités pour une utilisation ultérieure sans avoir à resélectionner manuellement les ID d'entité. Vous pouvez créer des ensembles enregistrés de participants, d'échantillons biologiques et de fichiers en haut du tableau des résultats dans la ",
          noSaved: "Vous n'avez pas d'ensemble enregistré",
          lastSaved: 'Dernier enregistrement: il y a {date}',
          files: 'Fichiers',
          participants: 'Participants',
        },
      },
    },
    variants: {
      title: 'Exploration des variants',
      noDataVariant: 'Aucune donnée disponible pour ce variant',
      sidemenu: {
        participant: 'Participant',
        variant: 'Variant',
        gene: 'Gène',
        frequency: 'Fréquence',
        pathogenicity: 'Pathogénicité',
      },
      table: {
        consequences: 'Conséquences',
        clinvar: 'Clinvar',
        type: 'Type',
        variant_class: 'Variant class',
        variant_id: 'Variant ID',
        gnomAd: 'GnomAD',
        genome_build: 'Genome build',
        dbsnp: 'dbSNP',
        variant: 'Variant',
      },
      summary: {
        summary: 'Resumé',
        type: 'Type',
        chromosome: 'Chromosome',
        position: 'Position',
        cytobande: 'Cytobande',
        altAllele: 'Allèle ALT',
        refAllele: 'Allèle REF',
        referenceGenome: 'Génome référence',
        studies: 'Études',
        participants: 'Participants',
        genes: 'Gènes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genome (v3.1.1)',
        dbSNP: 'dbSNP',
        gnomAD: 'gnomAD',
      },
      consequences: {
        consequences: 'Conséquences',
        geneConsequences: 'Conséquences géniques',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'BAS',
          moderate: 'MODÉRÉ',
          high: 'HAUT',
        },
        AAColumn: 'AA',
        consequence: 'Conséquence',
        CDNAChangeColumn: 'ADN codant',
        conservationColumn: 'Conservation (PhyloP17Way) ',
        strand: 'Brin',
        vep: 'VEP',
        prediction: 'Prédiction',
        transcript: 'Transcrit',
        refSeq: 'refSeq',
        omim: 'Omim',
        hidetranscript: 'Show less',
        showtranscript: '{count} other transcripts',
      },
      frequencies: {
        frequencies: 'Fréquences',
        CQDGStudies: 'Études du CQDG',
        publicCohorts: 'Cohortes publiques',
        studies: 'Études',
        domain: 'Domaine',
        participants: 'Participants',
        participantsTooltip:
          'Due to participant confidentiality, links may return a smaller number than displayed.',
        frequency: 'Fréquence',
        altAlleles: 'Allèles ALT',
        altRef: 'Allèles (ALT + REF)',
        homozygotes: 'Homozygotes',
        total: 'Total',
        cohort: 'Cohorte',
      },
      pathogenicity: {
        pathogenicity: 'Pathogénicité',
        clinVar: 'ClinVar',
        genePhenotype: 'Gène - Phénotype',
        condition: 'Condition',
        gene: 'Gene',
        inheritance: 'Héritage',
        source: 'Source',
      },
    },
    studies: {
      title: 'Études',
    },
    dataExploration: {
      title: 'Exploration des données',
      sidemenu: {
        participant: 'Participant',
        biospecimen: 'Spécimen biologique',
        datafiles: 'Fichiers de données',
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
      tabs: {
        summary: {
          title: 'Sommaire',
          sociodemographics: {
            cardTitle: 'Profils sociodémographiques',
            sexTitle: 'Sexe',
            ethnicityTitle: 'Ethnicité',
            compositionFamilyTitle: 'Composition familiale',
          },
          availableData: {
            dataCategoryTitle: 'Participants par catégories de données',
            dataTypeTitle: 'Participants par types de données',
            studiesTitle: 'Participants par étude',
            axis: '# de participants',
            dataCategory: 'Catégorie de données',
            dataType: 'Type de données',
          },
          observed_phenotype_tagged: {
            cardTitle: 'Phénotypes observés (HPO)',
            phenotypeTree: {
              nbParticipant:
                '{count} participants (y compris les termes descendants sur ce chemin)',
              addTermToQuery: 'Ajouter un terme à la requête active',
              currentPath: 'Chemin actuel',
            },
            empty: 'Aucun phénotype observé signalé pour ces participants',
          },
          mondo: {
            cardTitle: 'Diagnostic (MONDO)',
            phenotypeTree: {
              nbParticipant:
                '{count} participants (y compris les termes descendants sur ce chemin)',
              addTermToQuery: 'Ajouter un terme à la requête active',
              currentPath: 'Chemin actuel',
            },
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
        },
        biospecimens: {
          title: 'Spécimens biologiques ({count})',
        },
        datafiles: {
          title: 'Fichiers de données ({count})',
          cavatica: {
            analyseInCavatica: 'Analyser dans Cavatica',
            bulkImportLimit: {
              title: 'Nombre maximal de fichiers dépassé',
              description:
                'Vous pouvez copier un maximum de <strong>{limit} fichiers</strong> en meme temps. Veuillez sélectionner moins de fichiers et réessayer.',
            },
            authWarning: {
              title: "Vous n'êtes pas connecté à Cavatica",
              description:
                "Afin d'analyser vos fichiers, vous devez d'abord vous connecter à votre compte Cavatica. Une fois connecté, vous serez redirigé vers cette page.",
            },
            analyseModal: {
              newProject: 'Nouveau projet',
              copyFiles: 'Copier des fichiers',
              copyFilesTo: 'Copier des fichiers vers...',
              createProjectToPushFileTo: 'Créez un projet pour pousser vos fichiers vers.',
              youAreAuthorizedToCopy: 'Vous êtes autorisé à copier',
            },
          },
        },
      },
    },
    join: {
      cancel: 'Annuler',
      next: 'Suivant',
      back: 'Retour',
      submit: 'Soumettre',
      disclaimers: {
        title: "Processus d'inscription au portail CQDG",
        description:
          "Le portail CQDG est le point d'entrée principal du hub de données CQDG. Le portail CQDG permet de rechercher, de visualiser et d'accéder aux données pertinentes pour CQDG. Certains ensembles de données peuvent nécessiter des approbations supplémentaires (par exemple, dbGaP) et des conditions d'accès et d'utilisation.",
        terms: {
          title: 'Termes et conditions du portail CQDG',
          lastUpdate: 'Dernière mise à jour: {date}',
          bullets: {
            1: "Mon objectif d'utilisation des données du portail CQDG est exempt de discrimination fondée sur la race, l'origine ethnique, la nationalité, le sexe, l'âge, les capacités physiques et/ou mentales, l'orientation sexuelle, l'identité ou l'expression de genre, la religion ou tout autre des motifs qui porteraient atteinte aux droits d'un individu.",
            2: "Je reconnaîtrai des ensembles de données spécifiques et/ou des numéros d'accès applicables ainsi que le hub de données CQDG dans ma diffusion des résultats de la recherche, selon le support ou le type de diffusion.",
            3: 'Je partagerai ou distribuerai uniquement les données du portail CQDG selon des conditions conformes à cet accord, et les données ou les dérivés des données ne peuvent être vendus, en tout ou en partie, à une personne à tout moment et à quelque fin que ce soit.',
            4: "Je respecterai la vie privée des participants à la recherche et je ne tenterai pas d'identifier ou de contacter des participants individuels ou des groupes auprès desquels des données ont été collectées ou de générer des informations qui pourraient permettre de déterminer facilement l'identité des participants.",
            5: "J'accepte de fournir une brève déclaration concernant mon utilisation prévue des données sur le portail du CQDG avec mon nom et mon affiliation qui seront affichés publiquement à des fins de transparence et de collaboration.",
            6: "Je comprends que la participation à la communauté du CQDG est volontaire et peut être résiliée par l'administrateur du portail du CQDG. Je signalerai toute violation réelle ou présumée de cet accord, même involontaire, à l'administrateur du portail du CQDG. Je comprends que l'administrateur du portail du CQDG peut prendre des mesures pour remédier à toute violation réelle ou présumée et/ou signaler un tel comportement aux autorités compétentes. Je comprends également que l'administrateur du portail du CQDG peut immédiatement suspendre ou résilier mon accès au portail du CQDG s'il y a une violation réelle ou présumée de cet accord.",
          },
          checkbox: "J'ai lu et j'accepte les termes et conditions du portail CQDG",
        },
        disclaimer: {
          title: 'Avis de non-responsabilité du portail CQDG',
          bullets: {
            1: 'Les données disponibles sur le portail CQDG sont fournies telles quelles et peuvent changer au fil du temps.',
            2: "CQDG ne garantit ni n'assume aucune responsabilité légale ou responsabilité pour les informations, appareils, produits ou processus contenus dans le portail CQDG.",
            3: "Le contenu fourni sur le portail CQDG est à titre informatif uniquement et n'est pas destiné à se substituer à un jugement, un conseil, un diagnostic ou un traitement médical professionnel indépendant.",
          },
          checkbox: "J'ai lu et compris les clauses de non-responsabilité du portail CQDG",
        },
        errors:
          'Veuillez accepter les termes et conditions et les clauses de non-responsabilité du portail.',
      },
      registration: {
        notice:
          'Les informations fournies ici seront partagées avec la communauté CQDG sur le portail CQDG. Tous les champs sont obligatoires, sauf indication contraire.',
        sections: {
          identification: 'Identification',
          roleAndAffiliation: 'Rôle et affiliation',
          researchAndDataUse: 'Recherche et utilisation des données',
        },
        labels: {
          firstName: 'Prénom',
          lastName: 'Nom de famille',
          haveAUserID: "J'ai un identifiant eRA Commons:",
          enterUserId: 'Veuillez saisir votre identifiant eRA Commons',
          commercialUseReason:
            'Veuillez fournir au moins 1 à 2 phrases pour décrire votre utilisation commerciale:',
          fullName: 'Full name',
          email: 'Email',
          iAmA: 'Je suis un/une:',
          pleaseDescribe: "Décrivez s'il vous plait",
          iAmAffiliatedWith: 'je suis affilié à:',
          intendToUser: "J'ai l'intention d'utiliser les données du portail CQDG pour:",
          dataUseStatement: "Déclaration d'utilisation des données",
          researchAreaDescribe:
            "Mon domaine de recherche ou mon domaine d'intérêt peut être décrit comme:",
        },
        placeHolders: {
          firstLast: 'Premier Dernier',
        },
        helps: {
          checkAllThatApply: 'Cochez toutes les cases',
          describeUseBelow: "À d'autres fins, vous devez décrire votre utilisation ci-dessous",
          provideBriefDescription:
            'Fournissez une brève description et un lien vers votre biographie professionnelle ou le site Web de votre organisation, si disponible',
          provideOrgAffiliation: 'Fournir une affiliation institutionnelle ou organisationnelle',
        },
        noticeNotPublicInfo: 'Ces informations ne seront pas rendues publiques.',
        nameAndEmailOfIndividual:
          "Veuillez fournir le nom et l'adresse e-mail d'une personne de votre institution, organisation ou similaire qui est au courant de l'utilisation que vous comptez faire des données (nous ne prévoyons pas de contacter cette personne, sauf dans les cas où nous devons vérifier votre identité).",
        roleOptions: {
          1: 'Chercheur dans une institution académique ou à but non lucratif',
          2: "Représentant d'une entité à but lucratif ou commerciale",
          3: "Développeur d'outils ou d'algorithmes",
          4: 'Clinicien',
          5: 'Membre de la communauté',
          6: 'Employé fédéral',
        },
        usageOptions: {
          1: 'En savoir plus sur le syndrome de Down et ses effets sur la santé, sa prise en charge et/ou son traitement',
          2: "M'aider à concevoir une nouvelle étude de recherche",
          3: 'Identifier les ensembles de données que je souhaite analyser',
          4: 'Fins commerciales',
        },
        userIdOptions: {
          1: 'Oui',
          2: 'Non',
        },
        optionsOther: 'Autre',
        noAffiliationOption: "Je n'ai pas d'affiliation institutionnelle.",
      },
    },
  },
  facets: {
    file_id: 'Fichier ID',
    // Participant
    participant_id: 'Participant ID',
    study_id: 'Étude ID',
    down_syndrome_status: 'Statut du syndrome de Down',
    down_syndrome_diagnosis: 'Diagnostic du syndrome de Down',
    mondo: {
      name: 'Diagnostic (MONDO)',
    },
    diagnosis: {
      mondo_id_diagnosis: 'Diagnostic (MONDO)',
    },
    phenotype: {
      hpo_phenotype_observed: 'Phénotype (HPO)',
    },
    age_at_data_collection: 'Âge à la collecte des données',
    family_type: 'Unité familiale',
    sex: 'Sexe',
    ethnicity: 'Origine ethnique',
    race: 'Race',
    observed_phenotype_tagged: {
      name: 'Phénotype (HPO)',
    },
    options: {
      D21: 'Disomie 21, euploïde',
      T21: 'Trisomie 21',
    },

    // Biospecimen
    biospecimen_type: 'Spécimen biologique Type',
    sample_type: 'Échantillon type',
    derived_sample_type: "Type d'échantillon dérivé",
    ncit_id_tissue_type: 'Tissue Type (NCIT)',
    status: 'Disponibilité',
    age_at_biospecimen_collection: 'Age du Biospecimen Collection (jours)',
    bio_repository: 'Biorepository',

    // File
    data_category: 'Catégorie de données',
    data_access: 'Accès aux données',
    data_type: 'Type de données',
    file_format: 'Format de fichier',
    size: 'Taille',
    access: 'Accéder',
    sequencing_experiment: {
      experiment_strategy: 'Stratégie expérimentale',
    },

    //Other
    collection_sample_type: "Type d'échantillon de collecte",

    //Variants
    variant_class: 'Variant class',
    type: 'Type',
    consequences: 'Conséquences',
    variant_external_reference: 'Référence externe',
    chromosome: 'Chromosome',
    position: 'Position',
    zygosity: 'Zygosité',
    transmissions: 'Transmissions',
    genePanels: 'Panels de gènes',

    // Studies
    domain: "Domaine d'étude",
    population: 'Population',
    participants: {
      diagnoses: {
        tagged_icd: {
          main_category: 'Type de maladie (CIM-10)',
        },
        tagged_mondo: {
          main_category: 'Diagnostic (Mondo)',
        },
      },
      observed_phenotype_tagged: {
        main_category: "Type d'anomalie phénotypique (HPO)",
      },
    },
  },
};

export default fr;

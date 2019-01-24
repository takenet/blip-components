export class LoadingService {
    private local: boolean;
    private loading: boolean;
    public isLoadingLocal: () => boolean;
    public isLoadingGlobal: () => boolean;
    public stopLoading: () => void;
    public startLoading: (local?: boolean) => void;

    constructor(private $rootScope) {
        'ngInject';

        this.loading = false;

        this.startLoading = (local = true) => {
            this.loading = true;
            this.local = local;

            try {
                $rootScope.$digest();
            } finally {
                return;
            }
        };

        this.stopLoading = () => {
            this.loading = false;
            try {
                $rootScope.$digest();
            } finally {
                return;
            }
        };

        this.isLoadingGlobal = () => this.loading && !this.local;
        this.isLoadingLocal = () => this.loading && this.local;
    }
}

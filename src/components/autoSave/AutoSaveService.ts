import { IScope } from 'angular';
import { AutoSaveEvent } from 'modules/ui/autoSave/autoSave.directive';

export class AutoSaveService {
    registerAction(
        $scope: IScope,
        subscriber: object,
        action: () => Promise<any>,
    ) {
        // Allows only one registration per subscriber on the scope
        let unsubscribeActionKey = `${AutoSaveEvent}-${
            subscriber.constructor.name
        }`;
        let unsubscribeAction = $scope[unsubscribeActionKey];
        if (unsubscribeAction) {
            unsubscribeAction();
        }

        $scope[unsubscribeActionKey] = $scope.$on(
            AutoSaveEvent,
            async () => {
                await action();
            },
        );
    }
}

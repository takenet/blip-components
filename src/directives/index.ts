import angular from 'core/angular';
import { AutoExpandDirective } from './autoExpand/AutoExpand.Directive';
import { FileModelDirective } from './fileModel/fileModelDirective';
import { PageHeaderDirective } from './pageHeader/PageHeaderDirective';
import { OnErrorSrcDirective } from './onErrorSrc/onErrorSrc.directive';
import { ErrorMessagesDirective } from './errorMessages/ErrorMessagesDirective';
import { Sidenav } from './sidenav/SidenavDirective';
import { PermissionsDirective } from './permissions';
import { UploadAreaDirective } from './uploadArea/UploadAreaDirective';
import { UploadButtonDirective } from './uploadButton/UploadButtonDirective';
import { UploadFileNameDirective } from './uploadFileName/UploadFileNameDirective';
import { OnFinishRenderDirective } from './onFinishRender/onFinishRender.directive';
import { JsonContentDirective } from './jsonContent';
import { LoadingDirective } from './loading/loading.directive';
import { StickyAttributeDirective } from './stickyAttribute/stickyAttribute.directive';
import { PasswordStrengthDirective } from './passwordStrength/passwordStrength.directive';
import { AutoSaveDirective } from './autoSave/autoSave.directive';

export const DirectivesModule = angular
    .module('DirectivesModule', [
        AutoExpandDirective,
        FileModelDirective,
        PageHeaderDirective,
        OnErrorSrcDirective,
        ErrorMessagesDirective,
        Sidenav,
        PermissionsDirective,
        UploadAreaDirective,
        UploadButtonDirective,
        UploadFileNameDirective,
        OnFinishRenderDirective,
        JsonContentDirective,
        LoadingDirective,
        StickyAttributeDirective,
        PasswordStrengthDirective,
        AutoSaveDirective
    ])
    .name;